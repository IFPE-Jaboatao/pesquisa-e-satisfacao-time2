import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserByAdminDto {
  @ApiProperty({
    example: 'administrador',
    description: 'Nome do administrador',
  })
  @IsString({
    message: 'O nome de usuário deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O nome de usuário é obrigatório.',
  })
  username!: string;

  @ApiProperty({
    example: 'admin@email.com',
    description: 'E-mail do administrador',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um e-mail válido.',
    },
  )
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do administrador',
  })
  @IsString({
    message: 'A senha deve ser um texto.',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  })
  password!: string;
}
