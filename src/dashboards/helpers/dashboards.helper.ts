import { IDashboadCards } from '../types/dashboards.types';
import { Card } from '../../cards/entities/card.entity';

export const sortCardsByPrior = (
  dashboardCards: IDashboadCards,
): IDashboadCards => {
  const priority = { low: 0, medium: 1, high: 2 };
  const sortedCards: IDashboadCards = {
    toDo: [],
    inProgress: [],
    review: [],
    completed: [],
  };
  for (const status in dashboardCards) {
    const cards: Card[] = dashboardCards[status];
    cards.sort((a, b) => priority[b.priority] - priority[a.priority]);
    sortedCards[status] = cards;
  }
  return sortedCards;
};

export const updateDashboardDateUpd = (date: Date): void => {
  console.log(date);
};
