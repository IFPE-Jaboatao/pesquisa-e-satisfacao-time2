import { Controller, Post, Body } from '@nestjs/common';
import { OptionService } from './option.service';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(@Body() createOptionDto: any) {
    return this.optionService.create(createOptionDto);
  }
}
