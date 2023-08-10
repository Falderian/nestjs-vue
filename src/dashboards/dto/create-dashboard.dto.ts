import { IsNotEmpty, MaxLength, Min } from 'class-validator';

export class CreateDashboardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Min(1)
  userId: string;
}
