import { Module, forwardRef } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Dashboard, User])],
  controllers: [DashboardsController],
  providers: [DashboardsService, JwtService],
  exports: [DashboardsService],
})
export class DashboardsModule {}
