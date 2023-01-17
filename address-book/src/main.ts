import helmet from 'helmet';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  const config = app.get(ConfigService);

  const port = config.get('PORT');
  await app.listen(port);
}
bootstrap();
