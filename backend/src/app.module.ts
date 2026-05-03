import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question/entities/question.entity';
import { Option } from './option/entities/option.entity';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: 'root', 
      database: 'pesquisa_satisfacao', 
      entities: [Question, Option],
      synchronize: true, //  criar as tabelas automaticamente
    }),
    QuestionModule,
    OptionModule,  
  ],
})
export class AppModule {}