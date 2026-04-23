import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API status object', () => {
      expect(appController.getHello()).toEqual({
        success: true,
        message: 'API online com sucesso',
        data: {
          name: 'Minha API',
          version: '1.0.0',
        },
        errors: null,
      });
    });
  });
});
