import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './model/create-task.dto';
import { Task } from './model/task.entity';
import { UpdateTaskDto } from './model/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  create(dto: CreateTaskDto) {
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
    await this.repository.save({ id, ...dto });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repository.delete({ id });
  }
}
