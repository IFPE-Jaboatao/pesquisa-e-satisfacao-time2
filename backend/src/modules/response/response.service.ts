import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Response } from './entities/response.entity';
import { ResponseItem } from './entities/response-item.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { Survey } from '../survey/entities/survey.entity';
import { Question, QuestionType } from '../question/entities/question.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,

    @InjectRepository(ResponseItem)
    private readonly responseItemRepository: Repository<ResponseItem>,

    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const survey: Survey | null = await this.surveyRepository.findOne({
      where: { id: createResponseDto.surveyId },
    });

    if (!survey) {
      throw new NotFoundException(
        `Pesquisa com ID ${createResponseDto.surveyId} não encontrada.`,
      );
    }

    if (!survey.isActive) {
      throw new BadRequestException('A pesquisa está inativa.');
    }

    const now = new Date();

    const startDate = survey.startDate ? new Date(survey.startDate) : null;

    const endDate = survey.endDate ? new Date(survey.endDate) : null;

    if (startDate && now < startDate) {
      throw new BadRequestException(
        'A pesquisa ainda não está disponível para resposta.',
      );
    }

    if (endDate && now > endDate) {
      throw new BadRequestException(
        'O período de resposta desta pesquisa já foi encerrado.',
      );
    }

    // BLOQUEIO DE RESPOSTA DUPLICADA
    const existingResponse = await this.responseRepository.findOne({
      where: {
        surveyId: createResponseDto.surveyId,
        respondentToken: createResponseDto.respondentToken,
      },
    });

    if (existingResponse) {
      throw new BadRequestException('Você já respondeu esta pesquisa.');
    }

    for (const item of createResponseDto.items) {
      const question = await this.questionRepository.findOne({
        where: {
          id: item.questionId,
          surveyId: createResponseDto.surveyId,
        },
      });

      if (!question) {
        throw new BadRequestException(
          `A pergunta ${item.questionId} não pertence à pesquisa informada.`,
        );
      }

      if (question.type === QuestionType.RATING) {
        if (
          item.ratingValue === undefined ||
          item.ratingValue < 1 ||
          item.ratingValue > 5
        ) {
          throw new BadRequestException(
            `A pergunta ${item.questionId} deve receber uma nota entre 1 e 5.`,
          );
        }
      }

      if (question.type === QuestionType.SINGLE_CHOICE) {
        if (!item.selectedOption) {
          throw new BadRequestException(
            `A pergunta ${item.questionId} deve receber uma opção selecionada.`,
          );
        }
      }

      if (question.type === QuestionType.RECOMMENDATION) {
        const allowed = ['SIM', 'TALVEZ', 'NAO'];

        if (!item.selectedOption || !allowed.includes(item.selectedOption)) {
          throw new BadRequestException(
            `A pergunta ${item.questionId} deve receber SIM, TALVEZ ou NAO.`,
          );
        }
      }

      if (question.type === QuestionType.TEXT) {
        if (!item.textAnswer || item.textAnswer.trim().length === 0) {
          throw new BadRequestException(
            `A pergunta ${item.questionId} deve receber uma resposta em texto.`,
          );
        }
      }
    }

    const response = this.responseRepository.create({
      surveyId: createResponseDto.surveyId,
      respondentToken: createResponseDto.respondentToken,
      course: createResponseDto.course,
      period: createResponseDto.period,
      shift: createResponseDto.shift,
      campus: createResponseDto.campus,
      finalComment: createResponseDto.finalComment,
      wouldRecommend: createResponseDto.wouldRecommend,

      items: createResponseDto.items.map((item) =>
        this.responseItemRepository.create({
          questionId: item.questionId,
          ratingValue: item.ratingValue,
          selectedOption: item.selectedOption,
          textAnswer: item.textAnswer,
        }),
      ),
    });

    return this.responseRepository.save(response);
  }

  async findAll(): Promise<Response[]> {
    return this.responseRepository.find({
      relations: ['survey', 'items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Response> {
    const response = await this.responseRepository.findOne({
      where: { id },
      relations: ['survey', 'items'],
    });

    if (!response) {
      throw new NotFoundException(`Resposta com ID ${id} não encontrada.`);
    }

    return response;
  }

  async findBySurvey(surveyId: number): Promise<Response[]> {
    return this.responseRepository.find({
      where: { surveyId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    const response = await this.findOne(id);
    await this.responseRepository.remove(response);
  }
}
