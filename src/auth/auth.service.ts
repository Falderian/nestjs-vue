import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { IAuthorizedUser } from './types/auth.types';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Inject } from '@nestjs/common';

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
}
