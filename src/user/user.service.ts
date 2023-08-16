import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUserWithoutPass } from './types/user.types';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { DashboardsService } from '../dashboards/dashboards.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async signUp(newUser: CreateUserDto): Promise<IUserWithoutPass> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }

  async findUser(param: string | number): Promise<User> {
    let user = new User();
    if (typeof param == 'string') {
      user = await this.userRepository.findOneBy({ username: param });
    } else {
      user = await this.userRepository.findOneBy({ id: param });
    }

    return user;
  }

  async update(user: UpdateUserDto): Promise<string | object> {
    const validUser = await this.authService.validateUser(
      user.username,
      user.password,
    );
    if (validUser) {
      const salt = 10;
      const hashedPassword = await bcrypt.hash(user.newPassword, salt);
      validUser.password = hashedPassword;
      await this.userRepository.update(validUser.id, validUser);
      return `User with username = ${user.username} has been updated`;
    } else {
      return new ConflictException('Wrong password or username').getResponse();
    }
  }

  async remove(id: number): Promise<any> {
    try {
      this.userRepository.delete(id);
      return `User has been deleted`;
    } catch (error) {
      console.log(error);
    }
  }
}
