import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSurveyDto {
  @ApiProperty({
    example: 'Pesquisa de Satisfação 2026.1',
    description: 'Título da pesquisa',
  })
  @IsString({
    message: 'O título deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O título da pesquisa é obrigatório.',
  })
  @MaxLength(150, {
    message: 'O título deve ter no máximo 150 caracteres.',
  })
  title!: string;

  @ApiPropertyOptional({
    example: 'Pesquisa institucional dos serviços do campus',
    description: 'Descrição da pesquisa',
  })
  @IsOptional()
  @IsString({
    message: 'A descrição deve ser um texto.',
  })
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se a pesquisa está ativa',
  })
  @IsOptional()
  @IsBoolean({
    message: 'isActive deve ser verdadeiro ou falso.',
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    example: '2026-04-20T00:00:00.000Z',
    description: 'Data de início da pesquisa',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data inicial deve estar em formato válido.',
    },
  )
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-05-20T23:59:59.000Z',
    description: 'Data de encerramento da pesquisa',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data final deve estar em formato válido.',
    },
  )
  endDate?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se a pesquisa é anônima',
  })
  @IsOptional()
  @IsBoolean({
    message: 'isAnonymous deve ser verdadeiro ou falso.',
  })
  isAnonymous?: boolean;
}
