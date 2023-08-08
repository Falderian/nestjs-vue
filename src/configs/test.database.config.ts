import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../cards/entities/card.entity';
import { User } from '../user/entities/user.entity';

export const TestDatabaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.POSTGRES_PORT,
  password: process.env.PASSWORD,
  username: process.env.USER,
  database: 'nest-vue-test',
  entities: [User, Card],
  autoLoadEntities: true,
  synchronize: true,
});
