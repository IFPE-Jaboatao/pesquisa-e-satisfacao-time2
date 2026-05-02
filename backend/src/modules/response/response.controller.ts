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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/user-role.enum';

@ApiTags('Responses')
@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USUARIO)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar uma resposta da pesquisa' })
  @ApiResponse({ status: 201, description: 'Resposta registrada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Pesquisa não encontrada' })
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(createResponseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR, UserRole.COORDENACAO, UserRole.AUDITORIA)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas as respostas' })
  @ApiResponse({ status: 200, description: 'Lista de respostas retornada' })
  findAll() {
    return this.responseService.findAll();
  }

  @Get('survey/:surveyId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR, UserRole.COORDENACAO, UserRole.AUDITORIA)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar respostas por pesquisa' })
  @ApiParam({ name: 'surveyId', example: 1 })
  @ApiResponse({ status: 200, description: 'Respostas da pesquisa retornadas' })
  findBySurvey(@Param('surveyId', ParseIntPipe) surveyId: number) {
    return this.responseService.findBySurvey(surveyId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR, UserRole.COORDENACAO, UserRole.AUDITORIA)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar resposta por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Resposta encontrada' })
  @ApiResponse({ status: 404, description: 'Resposta não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRADOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover resposta por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Resposta removida com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.remove(id);
  }
}
