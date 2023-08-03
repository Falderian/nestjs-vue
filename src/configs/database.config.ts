import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

export const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.PORT,
  password: process.env.PASSWORD,
  username: process.env.USERNAME,
  database: 'nest-vue',
  entities: [User],
  autoLoadEntities: true,
  synchronize: true,
});
