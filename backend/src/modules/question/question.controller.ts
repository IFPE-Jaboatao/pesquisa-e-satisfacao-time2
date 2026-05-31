// question/question.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMINISTRADOR)
@ApiBearerAuth()
@Controller('questions')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
