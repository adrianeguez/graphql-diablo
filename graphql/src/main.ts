import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { join } from 'path';
// import * as csurf from 'csurf';

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
  app.enableCors();
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 1000 * 10, // 10 segundos ->  15 * 60 * 1000, // 15 minutos
    max: 5 // limit each IP to 100 requests per windowMs
  }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // app.use(csurf());
  await app.listen(3000);
}
bootstrap();
