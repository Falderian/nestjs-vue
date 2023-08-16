import { Card } from '../../cards/entities/card.entity';
export interface IDashboadCards {
  toDo: Card[];
  inProgress: Card[];
  review: Card[];
  completed: Card[];
}
