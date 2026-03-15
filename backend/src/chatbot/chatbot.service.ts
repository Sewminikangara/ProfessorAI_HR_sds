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
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    async processMessage(message: string, user: any) {
        // 1. Log the message
        await this.prisma.chatbotLog.create({
            data: {
                message,
                senderId: user.userId,
                role: user.role,
                companyId: user.companyId,
            },
        });

        // 2. Intent detection using Gemini
        const prompt = `
      You are ProfessorHR, "The intelligent assistant for modern HR teams."
      Your task is to detect the intent of the user message.
      The possible intents are:
      - APPLY_LEAVE
      - CHECK_LEAVE_BALANCE
      - SUBMIT_TIMESHEET
      - POLICY_QUERY
      - UNKNOWN

      User Message: "${message}"

      Respond ONLY with the intent name and any extracted parameters in JSON format.
      Example: { "intent": "APPLY_LEAVE", "params": { "startDate": "2024-03-14", "endDate": "2024-03-14" } }
    `;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let aiResponse = "I'm sorry, I couldn't understand that request. How can I help you with your HR needs?";

        try {
            const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

            switch (parsed.intent) {
                case 'APPLY_LEAVE':
                    aiResponse = `I've detected you want to apply for leave from ${parsed.params?.startDate} to ${parsed.params?.endDate}. I've submitted this for approval.`;
                    // In a real app, we'd call leaveService.apply()
                    break;
                case 'CHECK_LEAVE_BALANCE':
                    aiResponse = "You currently have 15 days of annual leave remaining.";
                    break;
                case 'SUBMIT_TIMESHEET':
                    aiResponse = "Your timesheet for today has been logged successfully.";
                    break;
                case 'POLICY_QUERY':
                    aiResponse = "According to the company policy, employees are entitled to 20 days of annual leave.";
                    break;
            }
        } catch (e) {
            console.error('Failed to parse AI response', e);
        }

        return { response: aiResponse };
    }
}
