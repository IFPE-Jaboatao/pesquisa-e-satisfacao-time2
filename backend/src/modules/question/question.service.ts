// question/question.service.ts

import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(dto: CreateQuestionDto) {
    const newQuestion = this.questionRepository.create(dto);
    return await this.questionRepository.save(newQuestion);
  }
  async findAll() {
    return await this.questionRepository.find({
      relations: ['options'], // Isso traz as opções da pesquisa junto com a pergunta
    });
  }
  async remove(id: number) {
    await this.questionRepository.delete(id);
    return { message: 'Pergunta removida com sucesso.' };
  }
}
