import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUserWithoutPass } from './types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(newUser: CreateUserDto): Promise<IUserWithoutPass> {
    const isUserExists = await this.findUser(newUser.username);
    if (isUserExists)
      throw new ConflictException(
        `User with login = ${newUser.username} already exists`,
      );
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }

  async findUser(param: string): Promise<User> {
    let user = new User();

    if (typeof param == 'string') {
      user = await this.userRepository.findOneBy({ username: param });
    } else {
      user = await this.userRepository.findOneBy({ id: param });
    }
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
