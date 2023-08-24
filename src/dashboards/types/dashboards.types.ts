import { Card } from '../../cards/entities/card.entity';
import { User } from '../../user/entities/user.entity';

export interface IDashboard {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  tasksCount?: number;
}

export interface IDashboadCards {
  toDo: Card[];
  inProgress: Card[];
  review: Card[];
  completed: Card[];
}

export type IDashboardsWithCards = IDashboard & { cards: IDashboadCards };
