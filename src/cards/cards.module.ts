import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Card } from './entities/card.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { DashboardsModule } from '../dashboards/dashboards.module';
import { Dashboard } from '../dashboards/entities/dashboard.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DashboardsModule,
    TypeOrmModule.forFeature([User, Card, Dashboard]),
  ],
  controllers: [CardsController],
  providers: [CardsService, JwtService],
  exports: [CardsService],
})
export class CardsModule {}
