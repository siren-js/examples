import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Stage } from '../stage';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  stage: Stage;
}
