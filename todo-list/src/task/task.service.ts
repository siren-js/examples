import { Repository } from 'typeorm';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './model/create-task.dto';
import { Task } from './model/task.entity';
import { UpdateTaskDto } from './model/update-task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  create(dto: CreateTaskDto) {
    this.logger.log(`creating task ${dto.title}`);
    return this.repository.save(dto);
  }

  findAll(): Promise<[Task[], number]> {
    return this.repository.findAndCount();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.repository.findOneBy({ id });
    if (task == null) {
      throw new NotFoundException();
    }
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    this.logger.log(`updating task ${id}`);
    return this.repository.save({ id, ...dto }, { reload: true });
  }

  async remove(id: number) {
    this.logger.log(`deleting task ${id}`);
    await this.repository.delete({ id });
  }
}
