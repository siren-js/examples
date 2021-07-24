import Task, { TaskStatus } from '../types/task';

export function findAll(): Task[] {
  return tasks;
}

export function findById(id: number): Task | undefined {
  return tasks[id - 1];
}

export function remove(id: number): void {
  delete tasks[id - 1];
}

export function save(task: Task): number {
  return tasks.push(task);
}

export function update(id: number, task: Task): void {
  tasks[id - 1] = task;
}

const tasks: Task[] = [
  {
    title: 'Task 1',
    status: TaskStatus.Complete
  },
  {
    title: 'Task 2',
    status: TaskStatus.InProgress
  },
  {
    title: 'Task 3',
    status: TaskStatus.ToDo
  }
];
