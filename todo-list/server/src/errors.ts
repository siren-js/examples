export class TaskNotFoundError extends Error {
  constructor(id: number) {
    super(`No task found with ID ${id}`);
  }
}

export class InvalidStatusChangeError extends Error {}
