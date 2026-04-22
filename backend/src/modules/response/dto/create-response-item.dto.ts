import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateResponseItemDto {
  @IsInt()
  questionId: number;

  @IsOptional()
  @IsInt()
  selectedValue?: number;

  @IsOptional()
  @IsString()
  textAnswer?: string;
}