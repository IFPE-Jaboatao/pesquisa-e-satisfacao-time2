import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, LessThanOrEqual, Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { ResponseItem } from './entities/response-item.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { Survey } from '../survey/entities/survey.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,

    @InjectRepository(ResponseItem)
    private readonly responseItemRepository: Repository<ResponseItem>,

    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const survey = await this.surveyRepository.findOne({
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

    if (survey.startDate && survey.startDate > now) {
      throw new BadRequestException(
        'A pesquisa ainda não está disponível para resposta.',
      );
    }

    if (survey.endDate && survey.endDate < now) {
      throw new BadRequestException(
        'O período de resposta desta pesquisa já foi encerrado.',
      );
    }

    const response = this.responseRepository.create({
      surveyId: createResponseDto.surveyId,
      course: createResponseDto.course,
      period: createResponseDto.period,
      shift: createResponseDto.shift,
      semester: createResponseDto.semester,
      campus: createResponseDto.campus,
      finalComment: createResponseDto.finalComment,
      wouldRecommend: createResponseDto.wouldRecommend,
      items: createResponseDto.items.map((item) =>
        this.responseItemRepository.create({
          questionId: item.questionId,
          selectedValue: item.selectedValue,
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