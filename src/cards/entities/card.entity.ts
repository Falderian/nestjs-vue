import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dashboard } from '../../dashboards/entities/dashboard.entity';
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.cards, {
    nullable: false,
    cascade: true,
  })
  dashboard: Dashboard;
}
