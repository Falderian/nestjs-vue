import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { Dashboard } from '../dashboards/entities/dashboard.entity';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
    @InjectRepository(Dashboard)
    private dashboardsRepository: Repository<Dashboard>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
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

    const newCard = await this.cardsRepository.save({
      ...createCardDto,
      dashboard,
    });

    delete newCard.dashboard;
    return newCard;
  }

  async find(id: number): Promise<Card> {
    const findedCard = await this.cardsRepository.findOneBy({
      id,
    });
    return findedCard;
  }

  async update(updateCardDto: UpdateCardDto): Promise<string> {
    const card = await this.cardsRepository.findOneBy({
      id: updateCardDto.id,
    });

    try {
      await this.cardsRepository.update(card.id, updateCardDto);
      return `Card with id = ${updateCardDto.id} has beed updated`;
    } catch (error) {
      return error;
    }
  }

  async delete(id: number): Promise<string> {
    try {
      await this.cardsRepository.delete(id);
      return `Card with id = ${id} has beed deleted`;
    } catch (error) {
      return error;
    }
  }
}
