import { isRecord } from '@siren-js/core/dist/util/type-guard';
import { InvalidStatusChangeError } from '../errors';
import Task, { TaskStatus } from '../models/task';

export function validateCreatePayload(value: unknown): Task {
  if (!isRecord(value)) {
    throw new Error('Invalid task representation');
  }
  if (typeof value.title !== 'string') {
    throw new Error('Missing property: title');
  } else if (/^\s*$/.test(value.title)) {
    throw new Error('Title cannot be empty');
  }
  if (
    value.status != null &&
    !Object.values(TaskStatus).includes(value.status as TaskStatus)
  ) {
    throw new Error(`Invalid task status: ${value.status}`);
  }
  return {
    title: value.title,
    status: (value.status as TaskStatus) ?? TaskStatus.ToDo
  };
}

export function validateUpdatePayload(oldTask: Task, newTask: unknown): Task {
  if (!isRecord(newTask)) {
    throw new Error('Invalid task representation');
  }
  if (newTask.title != null && /^\s*$/.test(newTask.title as string)) {
    throw new Error('Title cannot be empty');
  }
  if (newTask.status != null) {
    if (!Object.values(TaskStatus).includes(newTask.status as TaskStatus)) {
      throw new Error(`Invalid task status: ${newTask.status}`);
    }
    if (
      (oldTask.status === TaskStatus.ToDo ||
        oldTask.status === TaskStatus.Complete) &&
      newTask.status !== TaskStatus.InProgress
    ) {
      throw new InvalidStatusChangeError();
    }
  }
  return Object.assign({}, oldTask, newTask);
}
