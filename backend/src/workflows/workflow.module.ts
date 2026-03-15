import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { EmployeesModule } from '../employees/employees.module';

@Module({
    imports: [EmployeesModule],
    providers: [WorkflowService],
    exports: [WorkflowService],
})
export class WorkflowModule { }
