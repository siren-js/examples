import { Injectable } from '@nestjs/common';
import { Action, Entity } from '@siren-js/server';

import { Card } from './entities/card.entity';
import { next, previous } from './stage';
import { UrlProvider } from './url.provider';

@Injectable()
export class CardEntityMapper {
  constructor(private readonly urlProvider: UrlProvider) {}

  toCollection(cards: Card[]): Entity {
    return {
      class: ['KanbanBoard'],
      properties: {
        itemCount: cards.length,
      },
      links: [
        {
          rel: ['self'],
          href: this.urlProvider.cards,
        },
        {
          rel: ['profile'],
          href: this.urlProvider.profile,
          type: 'application/alps+xml',
        },
      ],
      actions: [
        {
          title: 'Add Card',
          name: 'create',
          method: 'POST',
          href: this.urlProvider.cards,
          fields: [
            {
              title: 'Description',
              name: 'description',
            },
          ],
        },
      ],
      entities: cards.map((card) => ({
        ...this.toItem(card),
        rel: ['item'],
      })),
    };
  }

  toItem(card: Card): Entity {
    const actions = [] as Action[];

    const previousStage = previous(card.stage);
    if (previousStage != null) {
      actions.push({
        title: `Move to ${previousStage}`,
        name: 'move-to-previous-stage',
        method: 'PATCH',
        href: this.urlProvider.card(card.id),
        fields: [{ type: 'hidden', name: 'stage', value: previousStage }],
      });
    }

    const nextStage = next(card.stage);
    if (nextStage != null) {
      actions.push({
        title: `Move to ${nextStage}`,
        name: 'move-to-next-stage',
        method: 'PATCH',
        href: this.urlProvider.card(card.id),
        fields: [{ type: 'hidden', name: 'stage', value: nextStage }],
      });
    }

    return {
      class: ['Card'],
      title: `Card ${card.id}`,
      properties: {
        description: card.description,
        stage: card.stage,
      },
      links: [
        {
          rel: ['self'],
          href: this.urlProvider.card(card.id),
        },
        {
          rel: ['collection', 'up'],
          class: ['KanbanBoard'],
          href: this.urlProvider.cards,
        },
        {
          rel: ['profile'],
          href: this.urlProvider.profile,
          type: 'application/alps+xml',
        },
      ],
      actions,
    };
  }
}
