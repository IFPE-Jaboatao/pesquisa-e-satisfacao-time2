import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { UserRole } from './user-role.enum';

type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
};

type JwtPayload = {
  username: string;
  sub: number;
  role: UserRole;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<AuthUser | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(pass, user.password);

    if (!passwordMatches) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  login(user: AuthUser): { access_token: string } {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUserByAdmin(
    createUserDto: CreateUserByAdminDto,
  ): Promise<AuthUser> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new BadRequestException('Usuário ou e-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      role: UserRole.ADMINISTRADOR,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
    };
  }

  async createFirstAdmin(
    createUserDto: CreateUserByAdminDto,
  ): Promise<AuthUser> {
    const totalUsers = await this.userRepository.count();

    if (totalUsers > 0) {
      throw new BadRequestException(
        'O administrador inicial já foi cadastrado. Faça login para criar novos usuários.',
      );
    }

    return this.createUserByAdmin(createUserDto);
  }

  async findAllUsers(): Promise<AuthUser[]> {
    const users = await this.userRepository.find({
      order: { id: 'ASC' },
    });

    return users.map(
      (user): AuthUser => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }),
    );
  }
}
