import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const survey = this.surveyRepository.create({
      ...createSurveyDto,
      startDate: createSurveyDto.startDate
        ? new Date(createSurveyDto.startDate)
        : null,
      endDate: createSurveyDto.endDate
        ? new Date(createSurveyDto.endDate)
        : null,
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

    Object.assign(survey, {
      ...updateSurveyDto,
      startDate:
        updateSurveyDto.startDate !== undefined
          ? updateSurveyDto.startDate
            ? new Date(updateSurveyDto.startDate)
            : null
          : survey.startDate,
      endDate:
        updateSurveyDto.endDate !== undefined
          ? updateSurveyDto.endDate
            ? new Date(updateSurveyDto.endDate)
            : null
          : survey.endDate,
    });

    return this.surveyRepository.save(survey);
  }

  async remove(id: number): Promise<void> {
    const survey = await this.findOne(id);
    await this.surveyRepository.remove(survey);
  }
}
