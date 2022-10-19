import { map, Observable } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as Siren from '@siren-js/core';

import { Task } from './model/task.entity';
import { TaskCollectionEntityFactory } from './task-collection-entity.factory';

@Injectable()
export class TaskCollectionInterceptor implements NestInterceptor {
  constructor(private readonly factory: TaskCollectionEntityFactory) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<Siren.Entity> {
    return next.handle().pipe(map<[Task[], number], Siren.Entity>(([tasks]) => this.factory.create(tasks)));
  }
}
