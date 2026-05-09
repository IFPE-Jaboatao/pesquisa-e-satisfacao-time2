// option/dto/create-option.dto.ts

import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
