import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
  ArrayMinSize,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOptionDto } from '../../option/dto/CreateOptionDto';
import { OnlyOneCorrect } from '../validators/only-one-correct.validator';
import { NoDuplicateOptions } from '../validators/no-duplicate-options.validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(2) // minimo 2 opçoes
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @Validate(OnlyOneCorrect)
  @Validate(NoDuplicateOptions)
  options: CreateOptionDto[];
}
