import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Manaos Odyssey')
    .setDescription('Tourism and local culture platform API.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  const logger = new Logger('NestApplication');
  const swaggerUsersUrl = `http://localhost:3000/api`;

  logger.log(`Documentation available at ${swaggerUsersUrl}`);
}
bootstrap();
