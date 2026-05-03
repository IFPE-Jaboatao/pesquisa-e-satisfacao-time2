import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { ResponseItem } from './entities/response-item.entity';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { Survey } from '../survey/entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, ResponseItem, Survey])],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService, TypeOrmModule],
})
export class ResponseModule {}
