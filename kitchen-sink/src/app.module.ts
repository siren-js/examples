import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { validate } from './config.schema';
import { EchoController } from './echo.controller';
import { UrlProvider } from './url.provider';

@Module({
  imports: [ConfigModule.forRoot({ expandVariables: true, isGlobal: true, validate })],
  controllers: [AppController, EchoController],
  providers: [UrlProvider]
})
export class AppModule {}
