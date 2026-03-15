import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    @Roles('ADMIN', 'HR_MANAGER')
    @ApiOperation({ summary: 'Create a new employee (HR/Admin only)' })
    create(@Body() dto: CreateEmployeeDto, @GetUser() user: any) {
        return this.employeesService.create(dto, user.companyId);
    }

    @Get()
    @ApiOperation({ summary: 'List all employees in the company' })
    findAll(@GetUser() user: any) {
        return this.employeesService.findAll(user.companyId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get employee details' })
    findOne(@Param('id') id: string, @GetUser() user: any) {
        return this.employeesService.findOne(id, user.companyId);
    }

    @Patch(':id')
    @Roles('ADMIN', 'HR_MANAGER')
    @ApiOperation({ summary: 'Update employee details' })
    update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto, @GetUser() user: any) {
        return this.employeesService.update(id, dto, user.companyId);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Delete employee details' })
    remove(@Param('id') id: string, @GetUser() user: any) {
        return this.employeesService.remove(id, user.companyId);
    }
}
