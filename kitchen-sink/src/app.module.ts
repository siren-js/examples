import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthorController } from './author.controller';
import { validate } from './config.schema';
import { EchoController } from './echo.controller';
import { ItemController } from './item.controller';
import { UrlProvider } from './url.provider';

@Module({
  imports: [ConfigModule.forRoot({ expandVariables: true, isGlobal: true, validate })],
  controllers: [AppController, AuthorController, EchoController, ItemController],
  providers: [UrlProvider]
})
export class AppModule {}
