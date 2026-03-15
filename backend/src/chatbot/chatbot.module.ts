import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { EmployeesModule } from '../employees/employees.module';

@Module({
    imports: [EmployeesModule],
    providers: [ChatbotService],
    controllers: [ChatbotController],
})
export class ChatbotModule { }
