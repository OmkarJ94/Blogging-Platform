import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Blogging Plaform')
    .setDescription(
      "Blogging Platform API provides a robust backend for a blogging application. It includes endpoints to add and list blogs, like blogs and comments, and manage comments efficiently. Built with NestJS, it leverages TypeScript's strong typing and NestJS's scalable framework.",
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
