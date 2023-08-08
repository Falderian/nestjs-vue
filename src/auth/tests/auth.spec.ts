import { Test } from '@nestjs/testing';
import { TestDatabaseConfig } from '../../configs/test.database.config';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { UserModule } from '../../user/user.module';
import { JWTModule } from '../../configs/jwt.config';
import { UserController } from '../../user/user.controller';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';

const TestingModule = Test.createTestingModule({
  imports: [TestDatabaseConfig, UserModule, JWTModule],
  providers: [AuthService],
  controllers: [AuthController],
}).compile();

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;
  let userController: UserController;

  beforeAll(async () => {
    authService = (await TestingModule).get<AuthService>(AuthService);
    authController = (await TestingModule).get<AuthController>(AuthController);
    userController = (await TestingModule).get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(authController).toBeDefined();
  });

  it('should register and login user', async () => {
    const newUser = {
      username: 'test',
      password: 'test',
    };

    const user = { ...newUser };

    const registeredUser = await userController.signUp(newUser);
    const loginUser = await authController.login(user);
    expect(registeredUser.id).toEqual(loginUser.userId);
  });

  afterAll(async () => {
    const dataSource = (await TestingModule).get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();
  });
});
