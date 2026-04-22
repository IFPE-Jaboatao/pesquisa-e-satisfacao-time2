import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      message: 'API funcionando corretamente',
    };
  }
}
