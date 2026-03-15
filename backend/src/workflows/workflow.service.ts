import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkflowService {
    constructor(private prisma: PrismaService) { }

    async createWorkflow(dto: any, companyId: string) {
        return this.prisma.workflow.create({
            data: {
                ...dto,
                companyId,
            },
        });
    }

    async triggerOnboarding(employeeId: string, companyId: string) {
        const workflow = await this.prisma.workflow.findFirst({
            where: { companyId, type: 'ONBOARDING', status: 'ACTIVE' },
            include: { tasks: { orderBy: { order: 'asc' } } },
        });

        if (!workflow) return;

        const execution = await this.prisma.workflowExecution.create({
            data: {
                entityId: employeeId,
                workflowId: workflow.id,
                companyId,
            },
        });

        // Sequentially execute tasks (simulated)
        for (const task of workflow.tasks) {
            await this.prisma.workflowLog.create({
                data: {
                    message: `Executing task: ${task.title}`,
                    status: 'SUCCESS',
                    executionId: execution.id,
                },
            });

            // Special handling for automation actions
            if (task.action === 'CREATE_ACCOUNT') {
                // Logic to invite user to system
            }
        }

        await this.prisma.workflowExecution.update({
            where: { id: execution.id },
            data: { status: 'COMPLETED' },
        });

        return execution;
    }
}
