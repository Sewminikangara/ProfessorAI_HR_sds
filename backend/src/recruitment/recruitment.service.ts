import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecruitmentService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY') || 'dummy';
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    async createJob(dto: any, companyId: string) {
        return this.prisma.recruitmentJob.create({
            data: { ...dto, companyId },
        });
    }

    async applyToJob(jobId: string, dto: any) {
        const job = await this.prisma.recruitmentJob.findUnique({ where: { id: jobId } });
        if (!job) throw new NotFoundException('Job not found');

        const application = await this.prisma.jobApplication.create({
            data: {
                ...dto,
                jobId,
            },
        });

        // Trigger AI Screening asynchronously
        this.screenApplication(application.id, job.description);

        return application;
    }

    async screenApplication(applicationId: string, jobDescription: string) {
        const application = await this.prisma.jobApplication.findUnique({
            where: { id: applicationId },
        });

        if (!application) return;

        const prompt = `
      You are an AI Recruitment Specialist. Analyze the following candidate application against the Job Description.
      
      Job Description: "${jobDescription}"
      Candidate Name: "${application.candidateName}"
      Candidate Info: "${application.resumeUrl}" (Simulated resume content)

      Tasks:
      1. Rate the candidate from 0 to 100 based on skill match.
      2. Extract 3-5 matching skills.
      3. Provide a brief 2-sentence analysis.

      Respond ONLY in JSON format:
      {
        "aiScore": 85,
        "skillsMatch": "React, Node.js, TypeScript",
        "aiAnalysis": "Strong match with relevant experience in full-stack development. High proficiency in required tech stack."
      }
    `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

            await this.prisma.jobApplication.update({
                where: { id: applicationId },
                data: {
                    aiScore: parsed.aiScore,
                    skillsMatch: parsed.skillsMatch,
                    aiAnalysis: parsed.aiAnalysis,
                    status: parsed.aiScore >= 70 ? 'SCREENING' : 'PENDING',
                },
            });
        } catch (error) {
            console.error('AI Screening failed:', error);
        }
    }

    async getRankedCandidates(jobId: string, companyId: string) {
        return this.prisma.jobApplication.findMany({
            where: { jobId },
            orderBy: { aiScore: 'desc' },
        });
    }
}
