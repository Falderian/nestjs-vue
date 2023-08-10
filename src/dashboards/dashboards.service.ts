import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Dashboard } from './entities/dashboard.entity';
import { Card } from 'src/cards/entities/card.entity';
import { IDashboadCards } from './types/dashboards.types';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(dashboard: CreateDashboardDto) {
    const user = await this.userService.findUser(dashboard.userId);
    delete dashboard.userId;
    delete user.password;

    const statuses = {
      toDo: [],
      inProgress: [],
      review: [],
      completed: [],
    };

    try {
      const newDashboard = await this.dashboardsRepository.save({
        ...dashboard,
        ...statuses,
        cards: [],
        user,
      });
      return newDashboard;
    } catch (error) {
      throw new NotAcceptableException(
        `Dashboard with title = ${dashboard.title}, is laready exists`,
      );
    }
  }

  async getUsersDashboards(userId: string) {
    const user = await this.usersRepository.findOne({
      relations: ['dashboards'],
      where: { id: +userId },
    });
    const dashboards = user.dashboards.map(async (dashboard) => {
      const dashboardsCards = this.dashboardsRepository.findOne({
        relations: ['cards'],
        where: { id: dashboard.id },
      });
      return dashboardsCards;
    });
    return await Promise.all(dashboards);
  }

  async getDashboardsCards(dashboardId: string): Promise<IDashboadCards> {
    const dashboard = await this.dashboardsRepository.findOne({
      relations: ['cards'],
      where: { id: +dashboardId },
    });

    if (!dashboard)
      throw new NotFoundException(
        `Dashboard with id = ${dashboardId} not found`,
      );

    const cards: IDashboadCards = {
      toDo: [],
      inProgress: [],
      review: [],
      completed: [],
    };

    dashboard.cards.forEach((card) => cards[card.status].push(card));

    return cards;
  }

  async update(dashboard: UpdateDashboardDto) {
    const updatedDashboard = await this.dashboardsRepository.update(
      dashboard.id,
      dashboard,
    );

    return updatedDashboard;
  }

  async delete(dashboardId: string) {
    const res = this.dashboardsRepository.delete(dashboardId);
    return res;
  }
}
