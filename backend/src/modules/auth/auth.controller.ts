import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';

import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from './user-role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token JWT' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas.',
  })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Cadastro público de usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
  })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar usuário administrativo',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário administrativo criado com sucesso.',
  })
  createUserByAdmin(@Body() body: CreateUserByAdminDto) {
    return this.authService.createUserByAdmin(body);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR, UserRole.AUDITORIA)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar usuários cadastrados',
  })
  listUsers() {
    return this.authService.findAllUsers();
  }
}
