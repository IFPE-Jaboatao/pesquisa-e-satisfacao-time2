import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { NoDuplicateOptions } from './validators/no-duplicate-options.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService, NoDuplicateOptions],
})
export class QuestionModule {}
