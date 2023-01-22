import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  complete?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
