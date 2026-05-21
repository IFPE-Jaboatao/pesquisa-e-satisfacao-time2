import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResponseItemDto {
  @ApiProperty({
    example: 1,
    description: 'ID da pergunta respondida',
  })
  @IsInt()
  questionId!: number;

  @ApiPropertyOptional({
    example: 4,
    description: 'Valor selecionado para perguntas de escala',
  })
  @IsOptional()
  @IsInt()
  ratingValue?: number;

  @ApiPropertyOptional({
    example: 'Sim',
    description: 'Opção selecionada em perguntas objetivas',
  })
  @IsOptional()
  @IsString()
  selectedOption?: string;

  @ApiPropertyOptional({
    example: 'Gostei bastante da biblioteca.',
    description: 'Texto da resposta, usado em perguntas abertas',
  })
  @IsOptional()
  @IsString()
  textAnswer?: string;
}
