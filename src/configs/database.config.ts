import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Card } from '../cards/entities/card.entity';
import { Dashboard } from 'src/dashboards/entities/dashboard.entity';

export const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.POSTGRES_PORT,
  password: process.env.PASSWORD,
  username: process.env.USER,
  database: 'nest-vue',
  entities: [User, Card, Dashboard],
  autoLoadEntities: true,
  synchronize: true,
});
