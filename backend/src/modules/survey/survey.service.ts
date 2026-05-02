import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  private validateDates(startDate?: Date | null, endDate?: Date | null): void {
    if (startDate && endDate && startDate > endDate) {
      throw new BadRequestException(
        'A data de início não pode ser maior que a data de término.',
      );
    }
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const startDate = createSurveyDto.startDate
      ? new Date(createSurveyDto.startDate)
      : null;

    const endDate = createSurveyDto.endDate
      ? new Date(createSurveyDto.endDate)
      : null;

    this.validateDates(startDate, endDate);

    const survey = this.surveyRepository.create({
      ...createSurveyDto,
      startDate,
      endDate,
    });

    return this.surveyRepository.save(survey);
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({
      where: { id },
    });

    if (!survey) {
      throw new NotFoundException(`Pesquisa com ID ${id} não encontrada.`);
    }

    return survey;
  }

  async findActive(): Promise<Survey[]> {
    const now = new Date();

    return this.surveyRepository.find({
      where: [
        {
          isActive: true,
          startDate: LessThanOrEqual(now),
          endDate: MoreThanOrEqual(now),
        },
        {
          isActive: true,
          startDate: IsNull(),
          endDate: IsNull(),
        },
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const survey = await this.findOne(id);

    const startDate =
      updateSurveyDto.startDate !== undefined
        ? updateSurveyDto.startDate
          ? new Date(updateSurveyDto.startDate)
          : null
        : survey.startDate;

    const endDate =
      updateSurveyDto.endDate !== undefined
        ? updateSurveyDto.endDate
          ? new Date(updateSurveyDto.endDate)
          : null
        : survey.endDate;

    this.validateDates(startDate, endDate);

    Object.assign(survey, {
      ...updateSurveyDto,
      startDate,
      endDate,
    });

    return this.surveyRepository.save(survey);
  }

  async remove(id: number): Promise<void> {
    const survey = await this.findOne(id);
    await this.surveyRepository.remove(survey);
  }
}
