import { IsNotEmpty, Matches, Validate } from 'class-validator';
import { StatusValidator } from '../validation/status.validation';

export class CreateCardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @Validate(StatusValidator)
  status: string;

  @IsNotEmpty()
  dashboardId: string;

  @IsNotEmpty()
  userId: string;
}
