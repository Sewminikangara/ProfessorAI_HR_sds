import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class ChatbotService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private employeesService: EmployeesService,
    ) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY') || 'dummy';
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    }

    async processMessage(message: string, user: any) {
        // 1. Log the incoming message
        await this.prisma.chatbotLog.create({
            data: {
                message,
                senderId: user.id,
                role: 'USER',
                companyId: user.companyId,
            },
        });

        const employee = await this.prisma.employee.findFirst({
            where: { userId: user.id }
        });

        if (!employee) {
            return { response: "I'm sorry, I couldn't find your employee profile in the system." };
        }

        // 2. Intent detection using Gemini
        const prompt = `
          You are ProfessorHR, "The intelligent assistant for modern HR teams."
          Your task is to detect the intent of the user message.
          The possible intents are:
          - CHECK_LEAVE_BALANCE (User wants to know their remaining leave/PTO)
          - CHECK_TIMESHEETS (User wants to know logged hours)
          - POLICY_QUERY (General HR questions)
          - UNKNOWN

          User Message: "${message}"

          Respond ONLY with the intent name and any extracted parameters in JSON format.
          Example: { "intent": "CHECK_LEAVE_BALANCE" }
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const text = result.response.text();
            const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

            let dbData = "";
            let systemPrompt = "";

            switch (parsed.intent) {
                case 'CHECK_LEAVE_BALANCE':
                    // Mock balance logic based on real DB objects
                    const leaveRequests = await this.prisma.leaveRequest.findMany({
                        where: { employeeId: employee.id, status: 'APPROVED' }
                    });
                    const usedDays = leaveRequests.length * 2; // Rough metric for demo
                    dbData = `Employee Name: ${employee.firstName}. Total Annual Leave: 20 days. Used so far: ${usedDays} days. Remaining: ${20 - usedDays} days.`;
                    break;
                case 'CHECK_TIMESHEETS':
                    const timesheets = await this.prisma.timesheet.findMany({
                        where: { employeeId: employee.id }
                    });
                    const totalHours = timesheets.reduce((acc, curr) => acc + curr.hours, 0);
                    dbData = `Employee Name: ${employee.firstName}. Total hours logged: ${totalHours} hours across ${timesheets.length} entries.`;
                    break;
                case 'POLICY_QUERY':
                case 'UNKNOWN':
                default:
                    dbData = "Company standard policy: Working hours are 9-5. 20 Days PTO annually. Remote work is allowed 2 days a week.";
                    break;
            }

            // 3. Generate final conversational response
            const finalPrompt = `
                You are ProfessorHR, an enthusiastic, helpful, and professional AI HR Assistant.
                A user named ${employee.firstName} asked: "${message}"
                
                Here is the real database context you must use to answer them accurately:
                [CONTEXT]
                ${dbData}
                [/CONTEXT]
                
                Generate a helpful, conversational, and concise response to the user. Do not mention that you queried a database. Be polite!
            `;

            const finalResult = await this.model.generateContent(finalPrompt);
            const aiResponse = finalResult.response.text();

            // Log AI response
            await this.prisma.chatbotLog.create({
                data: {
                    message: aiResponse,
                    senderId: 'ProfessorAI',
                    role: 'AI',
                    companyId: user.companyId,
                },
            });

            return { response: aiResponse };

        } catch (e: any) {
            console.error('Failed to process AI response', e.message);
            return { response: "I'm experiencing a temporary cognitive glitch. Please try asking again in a moment!" };
        }
    }
}
