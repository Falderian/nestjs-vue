import { User } from '../entities/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Test } from '@nestjs/testing';
import { TestDatabaseConfig } from '../../configs/test.database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const TestingModule = Test.createTestingModule({
  imports: [TestDatabaseConfig, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
}).compile();

describe('UserController', () => {
  let service: UserService;
  let controller: UserController;

  const newUser = {
    username: (Math.random() * 100).toFixed(),
    password: (Math.random() * 100).toFixed(),
  };

  beforeAll(async () => {
    service = (await TestingModule).get<UserService>(UserService);
    controller = (await TestingModule).get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should resigter user', async () => {
    const registeredUser = await controller.signUp(newUser);
    expect(registeredUser.username).toBe(newUser.username);
  });

  it('should find user', async () => {
    const findedUser = await service.findUser(newUser.username);
    expect(findedUser.username).toBe(newUser.username);
  });

  it('should throw error, when user already exists and trying to register', async () => {
    try {
      await controller.signUp(newUser);
    } catch (error) {
      expect(error.message).toBe(
        `User with login = ${newUser.username} already exists`,
      );
    }
  });

  afterAll(async () => {
    const dataSource = (await TestingModule).get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();
  });
});
