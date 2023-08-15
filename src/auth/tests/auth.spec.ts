import { Test } from '@nestjs/testing';
import { TestDatabaseConfig } from '../../configs/test.database.config';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { UserModule } from '../../user/user.module';
import { JWTModule } from '../../configs/jwt.config';
import { UserController } from '../../user/user.controller';
import { clearDatabase } from '../../utils/utils';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;
  let userController: UserController;

  beforeAll(async () => {
    const TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseConfig, UserModule, JWTModule],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    authService = TestingModule.get<AuthService>(AuthService);
    authController = TestingModule.get<AuthController>(AuthController);
    userController = TestingModule.get<UserController>(UserController);
    clearDatabase(TestingModule);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(authController).toBeDefined();
  });

  it('should register and login user', async () => {
    const newUser = {
      username: (Math.random() * 100 ** 5).toString(),
      password: (Math.random() * 100 ** 5).toString(),
    };

    const user = { ...newUser };

    const registeredUser = await userController.signUp(newUser);
    const loginUser = await authController.login(user);
    expect(registeredUser.id).toEqual(loginUser.userId);
  });
});
