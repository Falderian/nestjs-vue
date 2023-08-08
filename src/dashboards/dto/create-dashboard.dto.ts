import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDashboardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MaxLength(20)
  userid: string;
}
