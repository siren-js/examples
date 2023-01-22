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
        class: ['task'],
        title: `Task ${task.id}`
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
          name: 'description',
          title: 'Description',
          pattern: '\\S+',
          required: true,
          placeholder: 'Describe the task'
        }
      ]
    };
  }
}
