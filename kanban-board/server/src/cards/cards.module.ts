import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardEntityMapper } from './card-entity.mapper';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { UrlProvider } from './url.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService, CardEntityMapper, UrlProvider],
})
export class CardsModule {}
