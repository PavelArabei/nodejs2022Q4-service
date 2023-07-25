import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as process from 'process';

async function bootstrap() {
  dotenv.config();
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || 4000);
  console.log(PORT);
}
bootstrap();
