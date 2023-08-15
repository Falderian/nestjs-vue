import { TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Dashboard } from '../dashboards/entities/dashboard.entity';
import { User } from '../user/entities/user.entity';
import { Card } from '../cards/entities/card.entity';

export const clearDatabase = async (Module: TestingModule): Promise<void> => {
  const dataSource = Module.get(DataSource);
  await dataSource.createQueryBuilder().delete().from(Card).execute();
  await dataSource.createQueryBuilder().delete().from(Dashboard).execute();
  await dataSource.createQueryBuilder().delete().from(User).execute();
};
