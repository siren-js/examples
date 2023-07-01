import { follow, parse, resolve, submit } from '@siren-js/client';

import { Card } from './card';
import { baseUrl } from './config';

export async function move() {
  const kanbanBoard = await follow(baseUrl).then(parse);

  const cards = await Promise.all(
    kanbanBoard.entities.filter((subEntity) => subEntity.rel.includes('item')).map(resolve)
  );

  cards.forEach((card) => {
    const action = card.getAction('move-to-next-stage');
    if (action != null) {
      submit(action)
        .then(parse<Card>)
        .then((card) => {
          console.log(`${card.properties.description} updated to ${card.properties.stage}`);
        });
    }
  });
}
