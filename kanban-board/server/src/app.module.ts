import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardsModule } from './cards/cards.module';
import { validate } from './config.schema';
import { TypeOrmConfigFactory } from './type-orm-config.factory';

@Module({
  imports: [
    CardsModule,
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigFactory,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
