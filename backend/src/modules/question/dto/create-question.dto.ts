import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
  ArrayMinSize,
  Validate,
  IsInt,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOptionDto } from '../../option/dto/CreateOptionDto';
import { NoDuplicateOptions } from '../validators/no-duplicate-options.validator';
import { QuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @IsString({ message: 'O título deve ser um texto.' })
  @IsNotEmpty({ message: 'O título da pergunta é obrigatório.' })
  title!: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  description?: string;

  @IsEnum(QuestionType, {
    message: 'O tipo da pergunta deve ser válido.',
  })
  type!: QuestionType;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsInt()
  step!: number;

  @IsInt()
  order!: number;

  @IsInt()
  surveyId!: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @Validate(NoDuplicateOptions)
  options?: CreateOptionDto[];
}
