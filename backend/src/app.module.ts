import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { WorkflowModule } from './workflows/workflow.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { LeaveModule } from './leave/leave.module';
import { TimesheetsModule } from './timesheets/timesheets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    EmployeesModule,
    ChatbotModule,
    RecruitmentModule,
    WorkflowModule,
    AnalyticsModule,
    LeaveModule,
    TimesheetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
