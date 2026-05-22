import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
  @IsNotEmpty({
    message: 'O e-mail é obrigatório.',
  })
  email!: string;

  @ApiProperty({ example: '123456', description: 'Senha do administrador' })
  @IsString({
    message: 'A senha deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A senha é obrigatória.',
  })
  password!: string;
}
