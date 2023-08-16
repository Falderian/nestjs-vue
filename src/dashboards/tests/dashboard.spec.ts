import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseConfig } from '../../configs/test.database.config';
import { UserModule } from '../../user/user.module';
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
import { UserController } from '../../user/user.controller';
import { DashboardsModule } from '../dashboards.module';
import { DashboardsController } from '../dashboards.controller';
import { Dashboard } from '../entities/dashboard.entity';
import { clearDatabase } from '../../utils/utils';
import { JWTModule } from '../../configs/jwt.config';
import { IAuthorizedUser } from '../../../dist/auth/types/auth.types';

describe('Dashboard Module', () => {
  let authController: AuthController;
  let userController: UserController;
  let dashboardController: DashboardsController;

  let loggedUser: IAuthorizedUser;
  let dashboard: Dashboard;

  async function CreateTestingModule(): Promise<TestingModule> {
    return await Test.createTestingModule({
      imports: [TestDatabaseConfig, UserModule, JWTModule, DashboardsModule],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();
  }

  const testingModule = CreateTestingModule();

  beforeAll(async () => {
    const module = await testingModule;
    authController = module.get<AuthController>(AuthController);
    userController = module.get<UserController>(UserController);
    dashboardController =
      module.get<DashboardsController>(DashboardsController);
    clearDatabase(module);
  });

  it('should register, login user and return an access token', async () => {
    const newUser = {
      username: (Math.random() * 100).toFixed().toString(),
      password: ((Math.random() * 1000) ** 10).toFixed().toString(),
    };

    const user = { ...newUser };

    await userController.signUp(newUser);
    loggedUser = await authController.login(user);
    expect(loggedUser.access_token && loggedUser.userId).not.toBeNull();
  });

  it('should create dashboard bounded to user', async () => {
    const newDashboard = {
      title: 'Test Dashboard',
      userId: loggedUser.userId,
    };
    dashboard = await dashboardController.create(newDashboard);
    expect(newDashboard.title).toEqual(dashboard.title);
    expect(newDashboard.userId === dashboard.user.id);
  });

  it('should update the title of dashboard', async () => {
    const newDashboard = { id: dashboard.id, title: 'New Title' };
    const updatedDashboard = await dashboardController.update(newDashboard);
    expect(updatedDashboard.title).toEqual(newDashboard.title);
  });

  it('should return 2 dashboards', async () => {
    const newDashboard = {
      title: (Math.random() * 100 ** 5).toString(),
      userId: loggedUser.userId,
    };
    await dashboardController.create(newDashboard);
    const usersDashboards = await dashboardController.getUsersDashboards(
      loggedUser.userId,
    );
    expect(usersDashboards).toHaveLength(2);
  });

  it('should delete the dashboard', async () => {
    const res = await dashboardController.delete(dashboard.id);
    expect(res).toEqual(`Dashboard with id = ${dashboard.id} has beed deleted`);
  });

  afterAll(async () => (await testingModule).close());
});
