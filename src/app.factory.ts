import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { PaginationInterceptor } from './interceptors/pagination.interceptor';
import { RequestLoggingInterceptor } from './interceptors/request-logging.interceptor';

function setupSwagger(app: INestApplication) {
  if (process.env.ENABLE_SWAGGER === 'false') {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Inventory management API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

export async function createApp(adapter?: AbstractHttpAdapter) {
  const app = adapter
    ? await NestFactory.create(AppModule, adapter)
    : await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(
    new RequestLoggingInterceptor(),
    new PaginationInterceptor(),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  setupSwagger(app);

  return app;
}
