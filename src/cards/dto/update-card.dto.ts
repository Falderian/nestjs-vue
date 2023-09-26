import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsNotEmpty, Validate } from 'class-validator';
import { StatusValidator } from '../validation/status.validation';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsNotEmpty()
  id: number;

  title: string;

  content: string;

  priority: string;

  @Validate(StatusValidator)
  status: string;
}
