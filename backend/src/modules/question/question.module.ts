import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { OnlyOneCorrect } from './validators/only-one-correct.validator';
import { NoDuplicateOptions } from './validators/no-duplicate-options.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService, OnlyOneCorrect, NoDuplicateOptions],
})
export class QuestionModule {}
