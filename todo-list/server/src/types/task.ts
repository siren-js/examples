export default interface Task {
  title: string;
  status: TaskStatus;
  dueDate?: Date;
}

export enum TaskStatus {
  ToDo = 'todo',
  InProgress = 'inprogress',
  Complete = 'complete'
}
