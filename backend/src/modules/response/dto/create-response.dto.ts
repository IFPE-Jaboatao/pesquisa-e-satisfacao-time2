import {
  IsArray,
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateResponseItemDto } from './create-response-item.dto';

export class CreateResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID da pesquisa respondida',
  })
  @IsInt()
  surveyId: number;

  @ApiPropertyOptional({
    example: 'ADS',
    description: 'Curso do respondente',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  course?: string;

  @ApiPropertyOptional({
    example: '2026.1',
    description: 'Período letivo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  period?: string;

  @ApiPropertyOptional({
    example: 'Noite',
    description: 'Turno do respondente',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  shift?: string;

  @ApiPropertyOptional({
    example: '3',
    description: 'Semestre do aluno',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  semester?: string;

  @ApiPropertyOptional({
    example: 'Jaboatão dos Guararapes',
    description: 'Campus do respondente',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  campus?: string;

  @ApiPropertyOptional({
    example: 'A internet pode melhorar.',
    description: 'Comentário final',
  })
  @IsOptional()
  @IsString()
  finalComment?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica se recomendaria a instituição',
  })
  @IsOptional()
  @IsBoolean()
  wouldRecommend?: boolean;

  @ApiProperty({
    type: [CreateResponseItemDto],
    description: 'Lista de respostas individuais',
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'A resposta deve conter pelo menos um item.' })
  @ValidateNested({ each: true })
  @Type(() => CreateResponseItemDto)
  items: CreateResponseItemDto[];
}
