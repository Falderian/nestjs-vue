import { User } from 'src/user/entities/user.entity';
import { IUserWithoutPass } from 'src/user/types/user.types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
