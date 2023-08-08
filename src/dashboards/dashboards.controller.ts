import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { AuthJwtGuards } from '../auth/guards/auth.guard';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { Dashboard } from './entities/dashboard.entity';

@UseGuards(AuthJwtGuards)
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Post()
  create(@Body() dashboard: CreateDashboardDto): Promise<any> {
    return this.dashboardsService.create(dashboard);
  }
}
