import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import { UserRole } from '../user-role.enum';

export class CreateUserByAdminDto {
  @ApiProperty({ example: 'coordenacao' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'coord@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.COORDENACAO,
  })
  @IsEnum(UserRole)
  role!: UserRole;
}
