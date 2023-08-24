import { IsNotEmpty, Min } from 'class-validator';

export class CreateDashboardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Min(1)
  userId: string | number;

  description?: string;
}
