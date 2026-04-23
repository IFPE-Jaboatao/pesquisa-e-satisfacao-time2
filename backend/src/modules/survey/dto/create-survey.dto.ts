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
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @ApiPropertyOptional({
    example: 'Pesquisa institucional dos serviços do campus',
    description: 'Descrição da pesquisa',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se a pesquisa está ativa',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: '2026-04-20T00:00:00.000Z',
    description: 'Data de início da pesquisa',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-05-20T23:59:59.000Z',
    description: 'Data de encerramento da pesquisa',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se a pesquisa é anônima',
  })
  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;
}
