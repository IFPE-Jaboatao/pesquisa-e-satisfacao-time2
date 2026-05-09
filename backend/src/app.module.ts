import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

<<<<<<< HEAD
import { HealthModule } from './modules/health/health.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ResponseModule } from './modules/response/response.module';
import { AuthModule } from './modules/auth/auth.module';

import { QuestionModule } from './modules/question/question.module';
import { OptionModule } from './modules/option/option.module';

=======
>>>>>>> origin/main
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}