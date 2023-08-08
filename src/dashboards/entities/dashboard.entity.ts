import {
  Column,
  Entity,
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

  @Column('int', { array: true, nullable: true })
  toDo: number[];

  @Column('int', { array: true, nullable: true })
  inProgress: Card[];

  @Column('int', { array: true, nullable: true })
  review: Card[];

  @Column('int', { array: true, nullable: true })
  completed: Card[];
}
