import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { IAuthorizedUser } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUser(username);
    if (!user)
      throw new ConflictException(
        `User with login = ${username} already exists`,
      );

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: CreateUserDto): Promise<IAuthorizedUser> {
    const findedUser = await this.validateUser(user.username, user.password);
    const payload = { username: user.username, sub: user.password };
    return {
      userId: findedUser.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
