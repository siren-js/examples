import { IsBoolean, IsOptional } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean()
  @IsOptional()
  complete?: boolean;
}
