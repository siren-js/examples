import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
