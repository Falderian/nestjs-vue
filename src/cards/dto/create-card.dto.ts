import { IsNotEmpty, Validate } from 'class-validator';
import { StatusValidator } from '../validation/status.validation';
import { priorityValidator } from '../validation/priority.validation';

export class CreateCardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @Validate(StatusValidator)
  status: string;

  @IsNotEmpty()
  dashboardId: number;

  @Validate(priorityValidator)
  @IsNotEmpty()
  priority: string;
}
