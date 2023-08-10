import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { User } from '../user/entities/user.entity';
import { Dashboard } from '../dashboards/entities/dashboard.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const dashboard = await this.dashboardsRepository.findOne({
      relations: ['cards', 'user'],
      where: {
        user: { id: +createCardDto.userId },
        id: +createCardDto.dashboardId,
      },
    });

    const isCardAlreadyExists = dashboard.cards.find(
      (card) => card.title === createCardDto.title,
    );

    if (isCardAlreadyExists)
      throw new ConflictException(
        `Card with title = ${createCardDto.title} is already exists on dashboard with title = ${dashboard.title}`,
      );

    delete createCardDto.dashboardId;
    delete dashboard.user;
    try {
      const newCard = await this.cardsRepository.save({
        ...createCardDto,
        dashboard,
      });

      delete newCard.dashboard;
      return newCard;
    } catch (error) {
      console.log(error);
    }
  }
}
