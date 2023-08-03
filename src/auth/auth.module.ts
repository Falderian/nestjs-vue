import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JWTModule } from 'src/configs/jwt.config';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule, JWTModule],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}
