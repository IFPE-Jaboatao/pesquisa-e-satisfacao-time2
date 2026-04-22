import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';

@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(createResponseDto);
  }

  @Get()
  findAll() {
    return this.responseService.findAll();
  }

  @Get('survey/:surveyId')
  findBySurvey(@Param('surveyId', ParseIntPipe) surveyId: number) {
    return this.responseService.findBySurvey(surveyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.remove(id);
  }
}