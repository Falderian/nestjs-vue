import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Catch,
} from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { AuthJwtGuards } from '../auth/guards/auth.guard';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
@UseGuards(AuthJwtGuards)
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Post()
  create(@Body() dashboard: CreateDashboardDto): Promise<any> {
    return this.dashboardsService.create(dashboard);
  }

  @Get(':id')
  getUsersDashboards(@Param('id') userId: string) {
    return this.dashboardsService.getUsersDashboards(userId);
  }

  @Get(':id/cards')
  getDashboardsCards(@Param('id') dashboardId: string) {
    return this.dashboardsService.getDashboardsCards(dashboardId);
  }
}
