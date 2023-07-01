import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { isValidUpdate } from './is-valid-update';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);

  constructor(
    @InjectRepository(Card)
    private readonly repository: Repository<Card>,
  ) {}

  create(dto: CreateCardDto): Promise<Card> {
    this.logger.log(`creating card ${dto.description}`);
    return this.repository.save(dto);
  }

  findAll(): Promise<Card[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.repository.findOneBy({ id });
    if (card == null) {
      throw new NotFoundException();
    }
    return card;
  }

  async update(id: number, dto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id);
    if (!isValidUpdate(card, dto)) {
      throw new BadRequestException(
        `Cannot update card ${id} from ${card.stage} to ${dto.stage}`,
      );
    }
    this.logger.log(`updating card ${id} to stage ${dto.stage}`);
    return this.repository.save({ id, ...card, ...dto }, { reload: true });
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`deleting card ${id}`);
    await this.repository.delete({ id });
  }
}
