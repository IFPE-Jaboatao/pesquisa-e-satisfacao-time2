import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa validação global (DTO + class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não definidos no DTO
      forbidNonWhitelisted: true, // erro se vier campo extra
      transform: true, // transforma tipos automaticamente
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
