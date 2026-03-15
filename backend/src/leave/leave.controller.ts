import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('leave')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('leave')
export class LeaveController {
    constructor(private readonly leaveService: LeaveService) { }

    @Post()
    create(@Body() dto: any, @GetUser() user: any) {
        return this.leaveService.create(dto, user);
    }

    @Get()
    findAll(@GetUser() user: any) {
        return this.leaveService.findAll(user.companyId);
    }
}
