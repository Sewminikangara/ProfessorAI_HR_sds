import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('recruitment')
@Controller('recruitment')
export class RecruitmentController {
    constructor(private recruitmentService: RecruitmentService) { }

    @Post('jobs')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new job opening' })
    createJob(@Body() dto: any, @GetUser() user: any) {
        return this.recruitmentService.createJob(dto, user.companyId);
    }

    @Post('jobs/:id/apply')
    @ApiOperation({ summary: 'Apply to a job (Public)' })
    apply(@Param('id') jobId: string, @Body() dto: any) {
        return this.recruitmentService.applyToJob(jobId, dto);
    }

    @Get('jobs/:id/candidates')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get ranked candidates for a job' })
    getCandidates(@Param('id') jobId: string, @GetUser() user: any) {
        return this.recruitmentService.getRankedCandidates(jobId, user.companyId);
    }
}
