import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica se a API está online' })
  @ApiResponse({
    status: 200,
    description: 'API funcionando corretamente',
    schema: {
      example: {
        status: 'ok',
      },
    },
  })
  check() {
    return this.healthService.check();
  }
}
