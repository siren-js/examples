import { Action, EmbeddedLink, Entity } from '@siren-js/core';
import Task from '../models/task';
import config from '../config';

export default function create(tasks: Task[]) {
  return new Entity({
    class: ['task', 'collection'],
    title: 'All Tasks',
    actions: [createAction(config.baseUrl)],
    entities: tasks.map(
      (task, index) =>
        new EmbeddedLink('item', config.hrefs.task(index + 1), {
          title: task.title
        })
    ),
    links: [
      { rel: ['self'], href: config.hrefs.tasks },
      { rel: ['profile'], href: config.hrefs.profile }
    ]
  });
}

const createAction = (baseUrl: string): Action =>
  new Action('create', config.hrefs.tasks, {
    title: 'Create Task',
    method: 'POST',
    fields: [
      {
        name: 'title',
        title: 'Title',
        pattern: '\\S+',
        required: true
      },
      {
        name: 'status',
        title: 'Status',
        type: 'select',
        options: [
          { title: 'To Do', value: 'todo', selected: true },
          { title: 'In Progress', value: 'inprogress' },
          { title: 'Complete', value: 'complete' }
        ]
      },
      {
        name: 'dueDate',
        title: 'Due Date',
        type: 'date'
      }
    ]
  });
