import { map, Observable } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as Siren from '@siren-js/core';

import { Task } from './model/task.entity';
import { TaskEntityFactory } from './task-entity.factory';

@Injectable()
export class TaskInterceptor implements NestInterceptor {
  constructor(private readonly factory: TaskEntityFactory) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<Siren.Entity> {
    return next.handle().pipe(map<Task, Siren.Entity>((task) => this.factory.create(task)));
  }
}
