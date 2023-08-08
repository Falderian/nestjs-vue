import { Card } from '../../cards/entities/card.entity';
export interface IUserWithoutPass {
  username: string;
  id: number;
  role: string;
  cards: Card[];
}
