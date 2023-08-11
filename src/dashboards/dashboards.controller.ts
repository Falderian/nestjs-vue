import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { AuthJwtGuards } from '../auth/guards/auth.guard';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { IDashboadCards } from './types/dashboards.types';
import { Dashboard } from './entities/dashboard.entity';

@UseGuards(AuthJwtGuards)
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Post()
  create(@Body() dashboard: CreateDashboardDto): Promise<Dashboard> {
    return this.dashboardsService.create(dashboard);
  }

  @Get(':id')
  getUsersDashboards(@Param('id') userId: string): Promise<Dashboard[]> {
    return this.dashboardsService.getUsersDashboards(userId);
  }

  @Get(':id/cards')
  getDashboardsCards(
    @Param('id') dashboardId: string,
  ): Promise<IDashboadCards> {
    return this.dashboardsService.getDashboardsCards(dashboardId);
  }

  @Put()
  update(@Body() dashboard: UpdateDashboardDto): Promise<Dashboard> {
    return this.dashboardsService.update(dashboard);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.dashboardsService.delete(id);
  }
}
