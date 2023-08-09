import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Dashboard } from './entities/dashboard.entity';
import { Card } from 'src/cards/entities/card.entity';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(dashboard: CreateDashboardDto) {
    const user = await this.userService.findUser(dashboard.userid);
    delete dashboard.userid;
    delete user.password;

    const statuses = {
      toDo: [],
      inProgress: [],
      review: [],
      completed: [],
    };

    const newDashboard = await this.dashboardsRepository.save({
      ...dashboard,
      ...statuses,
      user,
    });
    return newDashboard;
  }

  async getUsersDashboards(userId: string) {
    const user = await this.usersRepository.findOne({
      relations: ['dashboards'],
      where: { id: +userId },
    });

    return user.dashboards;
  }

  async getDashboardsCards(dashboardId: string): Promise<Card[]> {
    const dashboard = await this.dashboardsRepository.findOne({
      relations: ['cards'],
      where: { id: +dashboardId },
    });

    if (!dashboard)
      throw new NotFoundException(
        `Dashboard with id = ${dashboardId} not found`,
      );

    return dashboard.cards;
  }
}
