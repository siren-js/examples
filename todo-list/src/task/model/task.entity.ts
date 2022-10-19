import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  complete: boolean;

  @Column({ nullable: true })
  dueDate?: Date;

  @CreateDateColumn()
  createdAt: Date;
}
