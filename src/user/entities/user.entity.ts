import { Dashboard } from '../../dashboards/entities/dashboard.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 30, default: 'user' })
  role: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'dashboards' })
  dashboards: Dashboard[];
}
