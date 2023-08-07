import { IUserWithoutPass } from 'src/user/types/user.types';

export interface ICardWithUser {
  title: string;
  content: string;
  user: IUserWithoutPass;
}
