import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthJwtGuards } from 'src/auth/guards/auth.guard';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthJwtGuards)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto): Promise<User> {
    return this.cardsService.create(createCardDto);
  }
}
