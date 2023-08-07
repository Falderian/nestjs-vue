import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IAuthorizedUser } from './types/auth.types';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signin')
  async username(@Body() user: CreateUserDto): Promise<IAuthorizedUser> {
    return this.authService.login(user);
  }
}
