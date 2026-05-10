import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Responses')
@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar uma resposta da pesquisa' })
  @ApiResponse({ status: 201, description: 'Resposta registrada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Pesquisa não encontrada' })
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(createResponseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todas as respostas' })
  @ApiResponse({ status: 200, description: 'Lista de respostas retornada' })
  findAll() {
    return this.responseService.findAll();
  }

  @Get('survey/:surveyId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar respostas por pesquisa' })
  @ApiParam({ name: 'surveyId', example: 1 })
  @ApiResponse({ status: 200, description: 'Respostas da pesquisa retornadas' })
  findBySurvey(@Param('surveyId', ParseIntPipe) surveyId: number) {
    return this.responseService.findBySurvey(surveyId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar resposta por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Resposta encontrada' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remover resposta por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Resposta removida com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.remove(id);
  }
}
