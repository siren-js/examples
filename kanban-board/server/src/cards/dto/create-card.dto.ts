import { IsEnum, IsString } from 'class-validator';

import { Stage } from '../stage';

export class CreateCardDto {
  @IsString()
  description: string;

  @IsEnum(Stage)
  stage: Stage = Stage.ToDo;
}
