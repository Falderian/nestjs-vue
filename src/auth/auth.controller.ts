import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthorizedUser } from './types/auth.types';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signin')
  async login(@Body() user: CreateUserDto): Promise<IAuthorizedUser> {
    return this.authService.login(user);
  }
}
