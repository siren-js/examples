import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';

import { CreateTaskDto } from './model/create-task.dto';
import { UpdateTaskDto } from './model/update-task.dto';
import { TaskCollectionInterceptor } from './task-collection.interceptor';
import { TaskInterceptor } from './task.interceptor';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  @UseInterceptors(TaskInterceptor)
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseInterceptors(TaskCollectionInterceptor)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseInterceptors(TaskInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(TaskInterceptor)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
  }
}
