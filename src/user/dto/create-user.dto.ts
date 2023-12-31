import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
