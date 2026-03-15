import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterCompanyDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async registerCompany(dto: RegisterCompanyDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.$transaction(async (tx) => {
            const company = await tx.company.create({
                data: {
                    name: dto.companyName,
                    domain: dto.domain || dto.companyName.toLowerCase().replace(/\s+/g, ''),
                },
            });

            // 1. Create Admin User (Using the actual email they registered with)
            const adminUser = await tx.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    role: 'ADMIN',
                    companyId: company.id,
                },
            });
            await tx.employee.create({
                data: { firstName: 'Admin', lastName: 'User', email: adminUser.email, userId: adminUser.id, companyId: company.id, status: 'ACTIVE' },
            });

            // 2. Create HR Manager User
            const hrUser = await tx.user.create({
                data: {
                    email: `hr@${company.domain}.com`,
                    password: hashedPassword,
                    role: 'HR_MANAGER',
                    companyId: company.id,
                },
            });
            await tx.employee.create({
                data: { firstName: 'HR', lastName: 'Manager', email: hrUser.email, userId: hrUser.id, companyId: company.id, status: 'ACTIVE' },
            });

            // 3. Create Standard Employee User
            const employeeUser = await tx.user.create({
                data: {
                    email: `employee@${company.domain}.com`,
                    password: hashedPassword,
                    role: 'EMPLOYEE',
                    companyId: company.id,
                },
            });
            await tx.employee.create({
                data: { firstName: 'Standard', lastName: 'Employee', email: employeeUser.email, userId: employeeUser.id, companyId: company.id, status: 'ACTIVE' },
            });

            // Return token for the Admin so they login automatically
            return this.generateToken(adminUser);
        });
    }


    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user);
    }

    private generateToken(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role, companyId: user.companyId };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                companyId: user.companyId,
            },
        };
    }

    async validateUser(userId: string) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
}
