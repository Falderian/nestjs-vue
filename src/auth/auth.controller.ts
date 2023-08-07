import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signin')
  async username(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }
}
