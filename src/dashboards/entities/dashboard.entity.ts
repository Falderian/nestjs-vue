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
}
