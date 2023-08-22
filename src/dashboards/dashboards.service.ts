import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Dashboard } from './entities/dashboard.entity';
import { IDashboadCards, IDashboardsWithCards } from './types/dashboards.types';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Inject } from '@nestjs/common';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(dashboard: CreateDashboardDto): Promise<Dashboard> {
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

  async getUsersDashboards(id: number): Promise<Dashboard[]> {
    const user = await this.usersRepository.findOne({
      relations: ['dashboards'],
      where: { id },
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

  async getDashboard(dashboardId: number): Promise<IDashboardsWithCards> {
    const dashboard = await this.dashboardsRepository.findOne({
      relations: ['cards'],
      where: { id: dashboardId },
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

    dashboard.cards.forEach((card) =>
      cards[card.status].push(dashboard.cards.find((el) => el.id === card.id)),
    );
    const dashboardWithCards = {
      ...dashboard,
      cards,
      tasksCount: dashboard.cards.length,
    };
    console.log(dashboardWithCards);
    return dashboardWithCards;
  }

  async update(dashboard: UpdateDashboardDto): Promise<Dashboard> {
    await this.dashboardsRepository.update(dashboard.id, dashboard);
    const updatedDashboard = await this.dashboardsRepository.findOneBy({
      id: dashboard.id,
    });
    return updatedDashboard;
  }

  async find(id: number): Promise<Dashboard> {
    const dashboard = await this.dashboardsRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
    return dashboard;
  }

  async delete(dashboardId: number): Promise<string> {
    try {
      await this.dashboardsRepository.delete(dashboardId);
      return `Dashboard with id = ${dashboardId} has beed deleted`;
    } catch (error) {
      return error;
    }
  }
}
