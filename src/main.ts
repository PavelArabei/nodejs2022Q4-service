import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.getHttpAdapter()),
  );
  const config = new DocumentBuilder()
    .setTitle('Doc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT || 4000);
  const appLink = `http://localhost:${PORT}`;
  const doc = `${appLink}/doc`;

  console.log(`Server start on: ${appLink}`);
  console.log(`To open Doc click here: ${doc}`);
}
bootstrap();
