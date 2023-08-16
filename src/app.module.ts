import { Module } from '@nestjs/common';
import { DatabaseConfig } from './configs/database.config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { DashboardsModule } from './dashboards/dashboards.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseConfig,
    UserModule,
    AuthModule,
    CardsModule,
    DashboardsModule,
  ],
})
export class AppModule {}
