import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ICardWithUser } from './types/cards.types';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Dashboard } from '../dashboards/entities/dashboard.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const dashboard = await this.dashboardsRepository.findOneOrFail({
      relations: ['cards'],
      where: { id: +createCardDto.dashboardId },
    });

    const isCardAlreadyExists = dashboard.cards.map(
      (card) => card.title === createCardDto.title,
    );

    if (isCardAlreadyExists)
      throw new ConflictException(
        `Card with title = ${createCardDto.title} is already exists on dashboard with title = ${dashboard.title}`,
      );

    const newCard = await this.cardsRepository.save({
      ...createCardDto,
      dashboard,
    });

    dashboard[`${createCardDto.status}`].push(newCard.id);

    return newCard;
  }
}
