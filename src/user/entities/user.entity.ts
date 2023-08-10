import { Card } from '../../cards/entities/card.entity';
import { Dashboard } from '../../dashboards/entities/dashboard.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 30, default: 'user' })
  role: string;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user)
  @JoinColumn({ name: 'dashboards' })
  dashboards: Dashboard[];
}
