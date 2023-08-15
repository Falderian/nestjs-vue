import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { Card } from '../cards/entities/card.entity';
import { CardsService } from '../cards/cards.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Dashboard, User, Card])],
  controllers: [DashboardsController],
  providers: [DashboardsService, JwtService, CardsService],
  exports: [DashboardsService],
})
export class DashboardsModule {}
