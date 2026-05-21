import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Option } from './entities/option.entity';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { Question } from '../question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option, Question])],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
