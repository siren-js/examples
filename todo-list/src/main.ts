import helmet from 'helmet';
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    extensions: ['xhtml']
  });

  const config = app.get(ConfigService);

  const port = config.get('PORT');
  await app.listen(port);
}
bootstrap();
