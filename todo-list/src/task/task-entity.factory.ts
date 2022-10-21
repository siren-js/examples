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
      title: task.title,
      properties: {
        title: task.title,
        complete: task.complete
      },
      links: [
        { rel: ['self'], href: this.urls.task(task.id) },
        { rel: ['collection'], href: this.urls.tasks }
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
          name: 'title',
          title: 'Title',
          pattern: '\\S+',
          value: task.title
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
