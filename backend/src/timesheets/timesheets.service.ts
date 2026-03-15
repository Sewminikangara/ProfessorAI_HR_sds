import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimesheetsService {
    constructor(private prisma: PrismaService) { }

    async create(data: any, user: any) {
        const companyId = user.companyId;

        // Find the matching Employee record for this User
        const employee = await this.prisma.employee.findFirst({
            where: { userId: user.id }
        });

        if (!employee) {
            throw new Error("No employee record found for this user");
        }

        return this.prisma.timesheet.create({
            data: {
                date: new Date(data.date),
                hours: parseFloat(data.hours),
                task: data.task,
                status: 'PENDING',
                companyId,
                employeeId: employee.id,
            }
        });
    }

    async findAll(companyId: string) {
        return this.prisma.timesheet.findMany({
            where: { companyId },
            include: { employee: true },
            orderBy: { date: 'desc' }
        });
    }

    async findMyTimesheets(user: any) {
        const employee = await this.prisma.employee.findFirst({
            where: { userId: user.id }
        });

        if (!employee) {
            return [];
        }

        return this.prisma.timesheet.findMany({
            where: { employeeId: employee.id },
            orderBy: { date: 'desc' }
        });
    }
}
