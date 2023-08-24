import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthorizedUser } from './types/auth.types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signin')
  async login(@Body() user: CreateUserDto): Promise<IAuthorizedUser> {
    return this.authService.login(user);
  }

  @Post('token')
  @HttpCode(200)
  async validateToken(@Body() payload: { token: string }): Promise<User> {
    return this.authService.validateToken(payload.token);
  }
}
