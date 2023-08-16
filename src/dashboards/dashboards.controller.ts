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

// Uncomment to fill DB
// import { CardsService } from '../cards/cards.service';
// import { User } from '../user/entities/user.entity';
// import { UserService } from '../user/user.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@UseGuards(AuthJwtGuards)
@Controller('dashboards')
export class DashboardsController {
  constructor(
    // @InjectRepository(User)
    // private UserRepository: Repository<User>,
    // private readonly userService: UserService,
    // private readonly cardsService: CardsService,
    private readonly dashboardsService: DashboardsService,
  ) {}

  @Post()
  create(@Body() dashboard: CreateDashboardDto): Promise<Dashboard> {
    return this.dashboardsService.create(dashboard);
  }

  @Get(':id')
  getUsersDashboards(@Param('id') userId: number): Promise<Dashboard[]> {
    return this.dashboardsService.getUsersDashboards(userId);
  }

  @Get(':id/cards')
  getDashboardsCards(
    @Param('id') dashboardId: string,
  ): Promise<IDashboadCards> {
    return this.dashboardsService.getDashboardsCards(+dashboardId);
  }

  @Put()
  update(@Body() dashboard: UpdateDashboardDto): Promise<Dashboard> {
    return this.dashboardsService.update(dashboard);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.dashboardsService.delete(id);
  }

  // @Get()
  // async fill() {
  //   // fill users
  //   for (let i = 0; i <= 50; i++) {
  //     this.userService.signUp({
  //       username: `test${i}`,
  //       password: 'testtest',
  //     });
  //   }

  //   // fill dashboards
  //   const users = await this.UserRepository.find();
  //   users.forEach(async (user) => {
  //     for (let i = 0; i <= 10; i++) {
  //       await this.dashboardsService.create({
  //         title: (+new Date() * Math.random()).toString(36).substring(0, 9),
  //         userId: user.id,
  //       });
  //     }
  //   });

  //   // fill cards
  //   const dashboards = await this.dashboardsRepository.find({
  //     relations: ['user'],
  //   });
  //   const statuses = ['toDo', 'inProgress', 'review', 'completed'];
  //   dashboards.forEach(async (dashboard) => {
  //     for (let i = 0; i <= 50; i++) {
  //       const status = statuses[Math.floor(Math.random() * statuses.length)];
  //       const card = {
  //         title: (+new Date() * Math.random()).toString(36).substring(0, 9),
  //         content: (+new Date() * Math.random()).toString(36).substring(0, 9),
  //         status: status,
  //         dashboardId: dashboard.id,
  //         userId: dashboard.user.id,
  //       };
  //       await this.cardsService.create(card);
  //     }
  //   });
  // }
}
