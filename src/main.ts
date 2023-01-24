import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_PREFIX, FRONTEND_HOST, PORT } from './configs';
import { TimeoutInterceptor } from '@helpers/interceptors';
import { HttpExceptionFilter } from '@helpers/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set Cors
  app.enableCors({
    origin: FRONTEND_HOST,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Backend API SWagger')
    .setDescription('This is a detail specification of API Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(API_PREFIX)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-swagger', app, document);

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
