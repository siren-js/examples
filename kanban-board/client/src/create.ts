import { Action, Field, follow, parse, submit } from '@siren-js/client';

import { baseUrl } from './config';

const cards = ['Laundry', 'Dishes', 'Play video games', 'Cook dinner'];

export async function create() {
  const collection = await follow(baseUrl).then(parse);
  const action = collection.getAction('create');
  if (action != null) {
    cards.map((card) => {
      const fields = action.fields.map((field) => {
        const copy = { ...field };
        if (copy.name === 'description') {
          copy.value = card;
        }
        return copy as Field;
      });
      submit({ ...action, fields } as Action).then((res) => {
        console.log(`${res.status} (${res.statusText}): ${card}`);
      });
    });
  }
}
