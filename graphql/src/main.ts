import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Ejemplo de Usuarios')
  .setDescription('Api de usuarios para operaciones CRUD')
  .setVersion('0.1')
  .addTag('usuario')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors()

  await app.listen(3000);
}
bootstrap();
