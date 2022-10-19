import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './model/task.entity';
import { TaskCollectionEntityFactory } from './task-collection-entity.factory';
import { TaskEntityFactory } from './task-entity.factory';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UrlProvider } from './url.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskCollectionEntityFactory, TaskEntityFactory, TaskService, UrlProvider]
})
export class TaskModule {}
