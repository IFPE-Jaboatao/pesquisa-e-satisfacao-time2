import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Option } from './entities/option.entity';
import { CreateOptionDto } from './dto/CreateOptionDto';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,

    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createOptionDto: CreateOptionDto) {
    const question = await this.questionRepository.findOne({
      where: { id: createOptionDto.questionId },
    });

    if (!question) {
      throw new NotFoundException('Pergunta não encontrada.');
    }

    const newOption = this.optionRepository.create({
      ...createOptionDto,
      question,
    });

    return await this.optionRepository.save(newOption);
  }
}
