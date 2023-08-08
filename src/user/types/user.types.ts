import { Dashboard } from '../../dashboards/entities/dashboard.entity';
export interface IUserWithoutPass {
  username: string;
  id: number;
  role: string;
  dashboards: Dashboard[];
}
