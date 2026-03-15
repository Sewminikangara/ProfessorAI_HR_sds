import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { EmployeesModule } from '../employees/employees.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [EmployeesModule, PrismaModule],
    providers: [ChatbotService],
    controllers: [ChatbotController],
})
export class ChatbotModule { }
