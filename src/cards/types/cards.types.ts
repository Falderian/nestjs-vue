import { IUserWithoutPass } from '../../user/types/user.types';

export interface ICardWithUser {
  title: string;
  content: string;
  user: IUserWithoutPass;
}
