import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('chatbot')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chatbot')
export class ChatbotController {
    constructor(private chatbotService: ChatbotService) { }

    @Post('message')
    @ApiOperation({ summary: 'Send a message to the AI HR Assistant' })
    async sendMessage(@Body('message') message: string, @GetUser() user: any) {
        return this.chatbotService.processMessage(message, user);
    }
}
