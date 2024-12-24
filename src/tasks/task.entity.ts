import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user: User) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
