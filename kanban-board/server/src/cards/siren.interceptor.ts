import { Response } from 'express';
import { map, Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as Siren from '@siren-js/server';

import { CardEntityMapper } from './card-entity.mapper';
import { Card } from './entities/card.entity';

@Injectable()
export class SirenInterceptor implements NestInterceptor {
  constructor(private readonly cardEntityMapper: CardEntityMapper) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Siren.Entity> {
    const response = context.switchToHttp().getResponse() as Response;
    response.setHeader('Content-Type', 'application/vnd.siren+json');

    return next.handle().pipe(
      map<Card | Card[], Siren.Entity>((obj) => {
        if (Array.isArray(obj)) {
          return this.cardEntityMapper.toCollection(obj);
        } else {
          return this.cardEntityMapper.toItem(obj);
        }
      }),
    );
  }
}
