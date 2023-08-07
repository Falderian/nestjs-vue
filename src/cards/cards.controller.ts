import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthJwtGuards } from 'src/auth/guards/auth.guard';
import { Card } from './entities/card.entity';
import { ICardWithUser } from './types/cards.types';

@UseGuards(AuthJwtGuards)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto): Promise<ICardWithUser> {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  findAll(@Param('id') userid: string) {
    return this.cardsService.getUserCards(+userid);
  }
}
