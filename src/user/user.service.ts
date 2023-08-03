import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserDto) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    const user = await this.userRepository.save(newUser);
    const { password, ...result } = user;
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findUser(login: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ login: login });
    if (!user)
      throw new NotFoundException(`User with login = ${login} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
