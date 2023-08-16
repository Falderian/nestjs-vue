import { Test } from '@nestjs/testing';
import { TestDatabaseConfig } from '../../configs/test.database.config';
import { JWTModule } from '../../configs/jwt.config';
import { CardsModule } from '../cards.module';
import { clearDatabase } from '../../utils/utils';
import { CardsController } from '../cards.controller';
import { Dashboard } from '../../dashboards/entities/dashboard.entity';

import { CardsService } from '../cards.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { DashboardsService } from '../../dashboards/dashboards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { UserModule } from '../../user/user.module';
import { ConflictException } from '@nestjs/common';
import { IAuthorizedUser } from '../../../dist/auth/types/auth.types';

describe('Cards Module', () => {
  let userService: UserService;
  let authService: AuthService;
  let dashboardService: DashboardsService;
  let cardsService: CardsService;

  let loggedUser: IAuthorizedUser;
  let dashboard: Dashboard;
  let card: Card;

  async function CreateTestingModule() {
    return await Test.createTestingModule({
      imports: [
        TestDatabaseConfig,
        JWTModule,
        CardsModule,
        UserModule,
        TypeOrmModule.forFeature([Card, Dashboard]),
      ],
      providers: [CardsService, AuthService],
      controllers: [CardsController],
    }).compile();
  }

  const testingModule = CreateTestingModule();

  beforeAll(async () => {
    const module = await testingModule;
    cardsService = module.get<CardsService>(CardsService);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    dashboardService = module.get<DashboardsService>(DashboardsService);
    clearDatabase(module);
  });

  it('should register, login user and return an access token', async () => {
    const newUser = {
      username: (Math.random() * 100).toFixed().toString(),
      password: ((Math.random() * 1000) ** 10).toFixed().toString(),
    };

    const user = { ...newUser };

    await userService.signUp(newUser);
    loggedUser = await authService.login(user);
    expect(loggedUser.access_token && loggedUser.userId).not.toBeNull();
  });

  it('should create dashboard bounded to user', async () => {
    const newDashboard = {
      title: 'Test Dashboard',
      userId: loggedUser.userId,
    };
    dashboard = await dashboardService.create(newDashboard);
    expect(newDashboard.title).toEqual(dashboard.title);
    expect(newDashboard.userId === dashboard.user.id);
  });

  it('should create the card for the dasbhoard', async () => {
    const newCard = {
      title: 'New Test Card',
      content: 'The Content',
      status: 'toDo',
      userId: loggedUser.userId,
      dashboardId: dashboard.id,
    };
    card = await cardsService.create(newCard);
    expect(card.title).toBe(newCard.title);
  });

  it('should throw an error, when card already exists', async () => {
    const newCard = {
      title: 'New Test Card',
      content: 'The Content',
      status: 'toDo',
      userId: loggedUser.userId,
      dashboardId: dashboard.id,
    };

    try {
      await cardsService.create(newCard);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });

  it('should update the cards title and content', async () => {
    const [newTitle, newContent] = [
      'New title of card',
      'New content of the new card',
    ];

    const cardToUpdate = await cardsService.find(card.id);
    cardToUpdate.title = newTitle;
    cardToUpdate.content = newContent;
    await cardsService.update(cardToUpdate);
    const updatedCard = await cardsService.find(card.id);
    expect([updatedCard.title, updatedCard.content]).toEqual([
      newTitle,
      newContent,
    ]);
  });

  it('should delete card', async () => {
    const deletedCard = await cardsService.delete(card.id);
    expect(deletedCard).toBe(`Card with id = ${card.id} has beed deleted`);
  });

  afterAll(async () => (await testingModule).close());
});
