import { Injectable } from '@nestjs/common';
import * as Siren from '@siren-js/core';

import { Task } from './model/task.entity';
import { UrlProvider } from './url.provider';

@Injectable()
export class TaskCollectionEntityFactory {
  constructor(private readonly urls: UrlProvider) {}

  create(tasks: Task[]): Siren.Entity {
    return Siren.Entity.of({
      class: ['task', 'collection'],
      title: 'All Tasks',
      links: [
        { rel: ['self'], href: this.urls.tasks },
        { rel: ['profile'], href: this.urls.profile }
      ],
      actions: [this.makeCreateAction()],
      entities: tasks.map((task) => ({
        rel: ['item'],
        href: this.urls.task(task.id),
        title: task.title
      }))
    });
  }

  private makeCreateAction() {
    return {
      name: 'create',
      title: 'Create Task',
      method: 'POST',
      href: this.urls.tasks,
      fields: [
        {
          name: 'title',
          title: 'Title',
          pattern: '\\S+',
          required: true
        }
      ]
    };
  }
}
