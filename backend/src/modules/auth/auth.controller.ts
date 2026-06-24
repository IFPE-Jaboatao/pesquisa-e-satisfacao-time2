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
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRole } from './user-role.enum';
import { LoginDto } from './dto/login.dto';

type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
};

type LoginResponse = {
  access_token: string;
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token JWT' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Criar primeiro administrador do sistema' })
  @ApiResponse({
    status: 201,
    description: 'Primeiro administrador criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'O administrador inicial já foi cadastrado.',
  })
  createFirstAdmin(@Body() body: CreateUserByAdminDto): Promise<AuthUser> {
    return this.authService.createFirstAdmin(body);
  }

  @Post('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar usuário administrador' })
  @ApiResponse({
    status: 201,
    description: 'Usuário administrador criado com sucesso.',
  })
  createUserByAdmin(@Body() body: CreateUserByAdminDto): Promise<AuthUser> {
    return this.authService.createUserByAdmin(body);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar usuários cadastrados' })
  listUsers(): Promise<AuthUser[]> {
    return this.authService.findAllUsers();
  }
}
