import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ICardWithUser } from './types/cards.types';
import { AuthJwtGuards } from '../auth/guards/auth.guard';
import { Card } from './entities/card.entity';

@UseGuards(AuthJwtGuards)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto): Promise<any> {
    return this.cardsService.create(createCardDto);
  }
}
