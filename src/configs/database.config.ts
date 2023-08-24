import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Card } from '../cards/entities/card.entity';
import { Dashboard } from 'src/dashboards/entities/dashboard.entity';

const DEV = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.POSTGRES_PORT,
  password: process.env.PASSWORD,
  username: process.env.USER,
  database: process.env.DATABASE,
  entities: [User, Card, Dashboard],
  autoLoadEntities: true,
  synchronize: true,
});

const PROD = TypeOrmModule.forRoot({
  type: 'postgres',
  entities: [User, Card, Dashboard],
  autoLoadEntities: true,
  synchronize: true,
  url: 'postgres://mnxbfvxh:sRXcFP60CfP-5s7M118ucBdLVc4Kb4Ra@trumpet.db.elephantsql.com/mnxbfvxh',
});

console.log('ENVIROMENT MODE = ', process.env.ENV);
export const DatabaseConfig = process.env.ENV === 'dev' ? DEV : PROD;
