import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { dump } from "js-yaml";

import { join, resolve } from "path";
import { writeFile } from "fs/promises";

async function bootstrap() {
  dotenv.config();
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.getHttpAdapter()),
  // );
  const config = new DocumentBuilder()
    .setTitle("Doc")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  await app.listen(PORT || 4000);
  const appLink = `http://localhost:${PORT}`;
  const doc = `${appLink}/doc`;
  console.log(`Server start on: ${appLink}`);
  console.log(`To open Doc click here: ${doc}`);
  const pathToDocFile = join(resolve(), "doc", "api.yaml");
  const docYaml = dump(document);
  try {
    await writeFile(pathToDocFile, docYaml);
  } catch (err) {
    console.log(err.message);
  }
}

bootstrap();
