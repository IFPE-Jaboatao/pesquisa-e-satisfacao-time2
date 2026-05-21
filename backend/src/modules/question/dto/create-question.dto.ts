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
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(QuestionType)
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
