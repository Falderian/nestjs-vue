import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ICardWithUser } from './types/cards.types';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<ICardWithUser> {
    const user = await this.userService.findUser(createCardDto.userid);
    delete createCardDto.userid;
    delete user.password;
    const newCard = { ...createCardDto, user };
    await this.cardsRepository.save(newCard);
    return newCard;
  }

  async getUserCards(userid: number) {
    const users = await this.usersRepository.findOne({
      relations: ['cards'],
      where: { id: userid },
    });
    return users.cards;
  }
}
