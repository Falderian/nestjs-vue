import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserWithoutPass } from '../../user/types/user.types';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => User, (user) => user.cards, {
    nullable: false,
    cascade: true,
  })
  user: IUserWithoutPass;
}
