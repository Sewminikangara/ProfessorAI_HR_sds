import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('timesheets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('timesheets')
export class TimesheetsController {
    constructor(private readonly timesheetsService: TimesheetsService) { }

    @Post()
    create(@Body() dto: any, @GetUser() user: any) {
        return this.timesheetsService.create(dto, user);
    }

    @Get()
    findAll(@GetUser() user: any) {
        return this.timesheetsService.findAll(user.companyId);
    }

    @Get('me')
    findMyTimesheets(@GetUser() user: any) {
        return this.timesheetsService.findMyTimesheets(user);
    }
}
