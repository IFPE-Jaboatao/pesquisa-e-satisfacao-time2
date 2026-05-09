import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';

@Injectable()
// O NOME DA CLASSE DEVE SER OptionService (no singular, sem o 's' no meio)
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async create(data: any) {
    const newOption = this.optionRepository.create(data);
    return await this.optionRepository.save(newOption);
  }
}
