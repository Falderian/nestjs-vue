import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Dashboard } from './entities/dashboard.entity';

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
    const newDashboard = await this.dashboardsRepository.save({
      ...dashboard,
      user,
    });
    return newDashboard;
  }
}
