import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserWithoutPass } from '../../user/types/user.types';
import { User } from '../../user/entities/user.entity';
import { Dashboard } from 'src/dashboards/entities/dashboard.entity';
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.cards, {
    nullable: false,
    cascade: true,
  })
  dashboard: Dashboard;
}
