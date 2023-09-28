import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import {
  GoogleUser,
  IAuthorizedUser,
  IGoogleAuthorizedUser,
} from './types/auth.types';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Inject } from '@nestjs/common';
import { secret } from '../configs/jwt.config';
import { Request } from 'express';
import { IUserWithoutPass } from 'src/user/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUser(username);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: CreateUserDto): Promise<IAuthorizedUser> {
    const findedUser = await this.validateUser(user.username, user.password);
    if (!findedUser) throw new ConflictException(`Wrong username or password`);
    const payload = { username: user.username, sub: user.password };
    return {
      userId: findedUser.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<User> {
    try {
      const unhashedUser = await this.jwtService.verifyAsync(token, { secret });
      const user = await this.userService.findUser(unhashedUser.username);
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async googleLogin(
    req: Request,
  ): Promise<IGoogleAuthorizedUser | string | IUserWithoutPass> {
    if (!req.user) {
      return 'No user from google';
    } else {
      const user = req.user as GoogleUser;
      const hashedPassword = await bcrypt.hash(user.email, 10);
      const tempUser = {
        username: user.email,
        password: hashedPassword,
      };
      const findedUser = await this.userService.findUser(user.email);
      console.log(hashedPassword);
      if (!findedUser) {
        const registration = await this.userService.signUp(tempUser);
        return registration;
      } else {
        const loginUser = await this.login({
          ...tempUser,
          password: user.email,
        });
        console.log(loginUser);
      }

      return {
        message: 'User information from google',
        user: user as GoogleUser,
      };
    }
  }
}
