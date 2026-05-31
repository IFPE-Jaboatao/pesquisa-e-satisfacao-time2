import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) => {
          if (error.constraints?.whitelistValidation) {
            return [`O campo ${error.property} não é permitido.`];
          }

          return Object.values(error.constraints || {});
        });

        return new BadRequestException(messages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API - Sistema de Pesquisa de Satisfação')
    .setDescription(
      'Documentação da API REST do projeto de Pesquisa de Satisfação.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log('Servidor rodando em http://localhost:3000/api');
  console.log('Swagger disponível em http://localhost:3000/api/docs');
}

void bootstrap();
