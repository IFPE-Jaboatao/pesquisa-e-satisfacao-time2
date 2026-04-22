import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResponseItemDto } from './create-response-item.dto';

export class CreateResponseDto {
  @IsInt()
  surveyId: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  course?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  period?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  shift?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  semester?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  campus?: string;

  @IsOptional()
  @IsString()
  finalComment?: string;

  @IsOptional()
  @IsBoolean()
  wouldRecommend?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResponseItemDto)
  items: CreateResponseItemDto[];
}