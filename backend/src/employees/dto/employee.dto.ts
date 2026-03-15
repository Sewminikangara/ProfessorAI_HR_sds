import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    departmentId?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    positionId?: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto { }
