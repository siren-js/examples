import * as Siren from '@siren-js/core';
import _ from 'lodash';

import config from '../config';
import Task, { TaskStatus } from '../types/task';

export default function create(id: number, task: Task): Siren.Entity {
  const actions: Siren.Action[] = [];
  if (task.status !== TaskStatus.Complete) {
    actions.push(advanceAction(id, task));
  }
  if (task.status !== TaskStatus.ToDo) {
    actions.push(regressAction(id, task));
  }
  return new Siren.Entity({
    actions,
    class: ['task'],
    title: task.title,
    properties: _.pickBy(task, _.negate(_.isNil)),
    links: [
      { rel: ['self'], href: config.hrefs.task(id) },
      { rel: ['collection'], href: config.hrefs.tasks }
    ]
  });
}

function advanceAction(id: number, task: Task): Siren.Action {
  let title: string;
  let nextStatus: TaskStatus;
  switch (task.status) {
    case TaskStatus.ToDo:
      title = 'Mark as In Progress';
      nextStatus = TaskStatus.InProgress;
      break;
    case TaskStatus.InProgress:
      title = 'Mark as Complete';
      nextStatus = TaskStatus.Complete;
      break;
    default:
      throw new Error('this should not happen');
  }
  return updateStatusAction('advance', id, title, nextStatus);
}

function regressAction(id: number, task: Task): Siren.Action {
  let title: string;
  let previousStatus: TaskStatus;
  switch (task.status) {
    case TaskStatus.InProgress:
      title = 'Mark as To Do';
      previousStatus = TaskStatus.ToDo;
      break;
    case TaskStatus.Complete:
      title = 'Mark as In Progress';
      previousStatus = TaskStatus.InProgress;
      break;
    default:
      throw new Error('this should not happen');
  }
  return updateStatusAction('regress', id, title, previousStatus);
}

function updateStatusAction(
  name: string,
  id: number,
  title: string,
  status: string
): Siren.Action {
  return new Siren.Action(name, config.hrefs.task(id), {
    title,
    method: 'PATCH',
    fields: [{ type: 'hidden', name: 'status', value: status }]
  });
}
