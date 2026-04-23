import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      success: true,
      message: 'API online com sucesso',
      data: {
        name: 'Minha API',
        version: '1.0.0',
      },
      errors: null,
    };
  }
}
