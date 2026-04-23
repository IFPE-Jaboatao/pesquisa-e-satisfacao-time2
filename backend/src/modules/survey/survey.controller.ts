import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@ApiTags('Surveys')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova pesquisa' })
  @ApiResponse({ status: 201, description: 'Pesquisa criada com sucesso' })
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as pesquisas' })
  @ApiResponse({ status: 200, description: 'Lista de pesquisas retornada' })
  findAll() {
    return this.surveyService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Listar pesquisas ativas' })
  @ApiResponse({ status: 200, description: 'Lista de pesquisas ativas' })
  findActive() {
    return this.surveyService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pesquisa por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Pesquisa encontrada' })
  @ApiResponse({ status: 404, description: 'Pesquisa não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma pesquisa' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Pesquisa atualizada com sucesso' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma pesquisa' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Pesquisa removida com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.remove(id);
  }
}
