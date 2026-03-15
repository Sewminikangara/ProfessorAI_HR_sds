import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterCompanyDto } from './dto/auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new company and admin user' })
    register(@Body() dto: RegisterCompanyDto) {
        return this.authService.registerCompany(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login to the platform' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
