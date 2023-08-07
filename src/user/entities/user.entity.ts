import { Card } from 'src/cards/entities/card.entity';
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

  @OneToMany(() => Card, (card) => card.user, {
    nullable: false,
  })
  @JoinColumn({ name: 'cards' })
  cards: Card[] | [];
}
