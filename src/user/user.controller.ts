import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserWithoutPass } from './types/user.types';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthJwtGuards } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body() user: CreateUserDto): Promise<IUserWithoutPass> {
    return this.userService.signUp(user);
  }

  @UseGuards(AuthJwtGuards)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto): Promise<string | object> {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(AuthJwtGuards)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.userService.remove(+id);
  }
}
