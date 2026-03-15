import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private prisma: PrismaService) { }

    @Get('dashboard')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get dashboard statistics' })
    async getDashboardStats(@GetUser() user: any) {
        const companyId = user.companyId;

        const [employeeCount, recruitmentCount, activeWorkflows, pendingLeave] = await Promise.all([
            this.prisma.employee.count({ where: { companyId } }),
            this.prisma.jobApplication.count({ where: { job: { companyId } } }),
            this.prisma.workflowExecution.count({ where: { status: 'IN_PROGRESS', companyId } }),
            this.prisma.leaveRequest.count({ where: { status: 'PENDING', employee: { companyId } } }),
        ]);

        return {
            stats: [
                { label: 'Total Employees', value: employeeCount, trend: '+2%', color: 'blue' },
                { label: 'Active Candidates', value: recruitmentCount, trend: '+15%', color: 'amber' },
                { label: 'Running Workflows', value: activeWorkflows, trend: 'stable', color: 'indigo' },
                { label: 'Pending Requests', value: pendingLeave, trend: '-3%', color: 'rose' },
            ],
            recentActivity: [
                { id: 1, type: 'onboarding', message: 'New hire Sarah Jonson started onboarding', time: '2h ago' },
                { id: 2, type: 'leave', message: 'Leave request approved for Alex Rivera', time: '4h ago' },
                { id: 3, type: 'recruitment', message: 'AI screened 45 new candidates for Senior Dev', time: '1d ago' },
            ]
        };
    }
}
