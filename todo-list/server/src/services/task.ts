import db from '../db';
import { TaskNotFoundError } from '../errors';
import Task from '../models/task';

export function create(task: Task): number {
  return db.task.save(task);
}

export function update(id: number, task: Task): void {
  db.task.update(id, task);
}

export function getAll(): Task[] {
  return db.task.findAll();
}

export function getById(id: number): Task {
  const task = db.task.findById(id);
  if (task === undefined) {
    throw new TaskNotFoundError(id);
  }
  return task;
}

export function remove(id: number): void {
  db.task.remove(id);
}
