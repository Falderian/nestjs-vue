import { User } from '../entities/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Test } from '@nestjs/testing';
import { TestDatabaseConfig } from '../../configs/test.database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clearDatabase } from '../../utils/utils';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let service: UserService;
  let controller: UserController;

  const newUser = {
    username: (Math.random() * 100).toFixed(),
    password: (Math.random() * 100000).toFixed(),
  };

  beforeAll(async () => {
    const TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseConfig, TypeOrmModule.forFeature([User])],
      providers: [UserService, AuthService, JwtService],
      controllers: [UserController],
    }).compile();

    service = TestingModule.get<UserService>(UserService);
    controller = TestingModule.get<UserController>(UserController);
    clearDatabase(TestingModule);
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
      await controller.signUp({
        ...newUser,
        password: (Math.random() * 100000).toFixed(),
      });
    } catch (error) {
      expect(error.message).toBe(
        `User with login = ${newUser.username} already exists`,
      );
    }
  });
});
