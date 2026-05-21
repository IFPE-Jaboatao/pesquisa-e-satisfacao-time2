import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({
    example: 'Sim',
    description: 'Texto exibido para a opção',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  label!: string;

  @ApiPropertyOptional({
    example: 'sim',
    description: 'Valor interno da opção',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  value?: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'Pontuação usada para métricas e relatórios',
  })
  @IsOptional()
  @IsInt()
  score?: number;

  @ApiProperty({
    example: 1,
    description: 'ID da pergunta vinculada à opção',
  })
  @IsInt()
  questionId!: number;
}
