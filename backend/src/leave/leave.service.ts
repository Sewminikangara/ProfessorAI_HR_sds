import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaveService {
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

        let leaveType = await this.prisma.leaveType.findFirst({
            where: { name: data.type || 'Annual Leave', companyId }
        });

        if (!leaveType) {
            leaveType = await this.prisma.leaveType.create({
                data: {
                    name: data.type || 'Annual Leave',
                    daysPerYear: 20,
                    companyId
                }
            });
        }

        return this.prisma.leaveRequest.create({
            data: {
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                reason: data.reason,
                status: 'PENDING',
                companyId,
                employeeId: employee.id,
                typeId: leaveType.id
            }
        });
    }

    async findAll(companyId: string) {
        return this.prisma.leaveRequest.findMany({
            where: { companyId },
            include: { employee: true, type: true },
            orderBy: { startDate: 'desc' }
        });
    }
}
