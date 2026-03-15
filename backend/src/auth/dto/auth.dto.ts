import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class RegisterCompanyDto {
    @ApiProperty()
    @IsNotEmpty()
    companyName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    domain?: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
