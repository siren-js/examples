import { Injectable } from '@nestjs/common';
import * as Siren from '@siren-js/core';

import { Task } from './model/task.entity';
import { UrlProvider } from './url.provider';

@Injectable()
export class TaskEntityFactory {
  constructor(private readonly urls: UrlProvider) {}

  create(task: Task): Siren.Entity {
    const actions = [this.makeToggleCompleteAction(task), this.makeDeleteAction(task)];
    if (!task.complete) {
      actions.push(this.makeEditAction(task));
    }
    return Siren.Entity.of({
      class: ['task'],
      title: `Task ${task.id}`,
      properties: {
        description: task.description,
        complete: task.complete
      },
      links: [
        { rel: ['self'], href: this.urls.task(task.id) },
        { rel: ['collection', 'up'], href: this.urls.tasks },
        { rel: ['profile'], href: this.urls.profile }
      ],
      actions
    });
  }

  private makeDeleteAction(task: Task) {
    return Siren.Action.of({
      name: 'delete',
      method: 'DELETE',
      href: this.urls.task(task.id)
    });
  }

  private makeEditAction(task: Task) {
    return Siren.Action.of({
      name: 'edit',
      method: 'PATCH',
      href: this.urls.task(task.id),
      fields: [
        {
          name: 'description',
          title: 'Description',
          pattern: '\\S+',
          required: true,
          value: task.description
        }
      ]
    });
  }

  private makeToggleCompleteAction(task: Task) {
    return Siren.Action.of({
      name: 'toggle-complete',
      method: 'PATCH',
      href: this.urls.task(task.id),
      fields: [
        {
          name: 'complete',
          type: 'hidden',
          value: !task.complete
        }
      ]
    });
  }
}
