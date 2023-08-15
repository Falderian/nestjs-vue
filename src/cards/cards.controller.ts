import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthJwtGuards } from '../auth/guards/auth.guard';
import { Card } from './entities/card.entity';
import { UpdateCardDto } from './dto/update-card.dto';

@UseGuards(AuthJwtGuards)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<Card> {
    return this.cardsService.find(+id);
  }

  @Patch()
  update(@Body() updateCarDto: UpdateCardDto): Promise<string> {
    return this.cardsService.update(updateCarDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.cardsService.delete(+id);
  }
}
