import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateEmployeeDto, companyId: string) {
        return this.prisma.employee.create({
            data: {
                ...dto,
                companyId,
            },
        });
    }

    async findAll(companyId: string) {
        return this.prisma.employee.findMany({
            where: { companyId },
            include: { department: true, position: true },
        });
    }

    async findOne(id: string, companyId: string) {
        const employee = await this.prisma.employee.findFirst({
            where: { id, companyId },
            include: { department: true, position: true },
        });
        if (!employee) throw new NotFoundException('Employee not found');
        return employee;
    }

    async update(id: string, dto: UpdateEmployeeDto, companyId: string) {
        return this.prisma.employee.update({
            where: { id },
            data: { ...dto, companyId }, // Ensured scope
        });
    }

    async remove(id: string, companyId: string) {
        return this.prisma.employee.delete({
            where: { id },
        });
    }
}
