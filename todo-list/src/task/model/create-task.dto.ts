import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
}
