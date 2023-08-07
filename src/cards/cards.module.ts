import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { Card } from './entities/card.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Card])],
  controllers: [CardsController],
  providers: [CardsService, AuthModule, JwtService],
})
export class CardsModule {}
