import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { validate } from './config.schema';
import { TaskModule } from './task/task.module';
import { TypeOrmConfigFactory } from './type-orm-config.factory';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({ imports: [ConfigModule], useClass: TypeOrmConfigFactory }),
    TaskModule
  ],
  controllers: [AppController]
})
export class AppModule {}
