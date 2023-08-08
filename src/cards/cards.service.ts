import { Injectable } from '@nestjs/common';
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
    private readonly userService: UserService,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const dashboard = await this.dashboardsRepository.findOneOrFail({
      relations: ['cards'],
      where: { id: +createCardDto.userId },
    });
    return dashboard;
    //   const user = await this.userService.findUser(createCardDto.userId);
    //   delete createCardDto.userId;
    //   delete user.password;
    // const newCard = await this.cardsRepository.save({ ...createCardDto, user });
    // return newCard;
  }

  // async getUserCards(userid: number): Promise<Card[]> {
  //   const users = await this.usersRepository.findOne({
  //     relations: ['cards'],
  //     where: { id: userid },
  //   });
  //   return users.cards;
  // }
}
