import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  title: string;

  @ManyToOne(() => User, (user) => user.dashboards)
  user: User;

  @OneToMany(() => Card, (card) => card.dashboard)
  cards: Card[];

  @Column('int', { array: true, nullable: true, default: [] })
  toDo: number[];

  @Column('int', { array: true, nullable: true, default: [] })
  inProgress: number[];

  @Column('int', { array: true, nullable: true, default: [] })
  review: number[];

  @Column('int', { array: true, nullable: true, default: [] })
  completed: number[];
}
