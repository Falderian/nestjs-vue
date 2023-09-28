import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthorizedUser, IGoogleAuthorizedUser } from './types/auth.types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { GoogleAuthGuard } from 'src/googleAuth/google-auth.guard';
import { Request } from 'express';
import { IUserWithoutPass } from 'src/user/types/user.types';

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

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {
    console.log('Redirected to google-redirect route');
  }

  @Get('google-redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(
    @Req() req: Request,
  ): Promise<IGoogleAuthorizedUser | string | IUserWithoutPass> {
    return this.authService.googleLogin(req);
  }
}
