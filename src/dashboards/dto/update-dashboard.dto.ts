import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateDashboardDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @MinLength(3)
  title: string;

  description?: string;
}
