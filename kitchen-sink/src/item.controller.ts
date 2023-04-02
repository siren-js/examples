import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Entity } from '@siren-js/core';

import { SirenContent } from './siren-content.decorator';
import { UrlProvider } from './url.provider';

@Controller('items')
export class ItemController {
  constructor(private readonly urls: UrlProvider) {}

  @Get()
  @SirenContent()
  getItems() {
    return Entity.of({
      class: ['item', 'collection'],
      title: 'Item Collection',
      links: [
        {
          rel: ['self'],
          href: this.urls.items
        },
        {
          rel: ['index', 'up'],
          href: this.urls.baseUrl
        }
      ],
      entities: [1, 2, 3, 4, 5].map((id) => ({
        rel: ['item'],
        href: this.urls.item(id),
        title: `Item ${id}`
      }))
    });
  }

  @Get(':id')
  @SirenContent()
  getItem(@Param('id', ParseIntPipe) id: number) {
    if (id < 0) throw new NotFoundException();

    // pagination links:
    // id = 0; 0: self, first; 1: next
    // id = 1; 0: first, previous; 1: self; 2: next
    // id = 2; 0: first; 1: previous; 2: self; 3: next
    // id = 3; 0: first; 2: previous; 3: self; 4: next
    // id = 4; 0: first; 3: previous; 4: self; 5: next
    // id = 5; 0: first; 4: previous; 5: self; 6: next

    const links = [];

    const selfLink = {
      rel: ['self'],
      href: this.urls.item(id)
    };

    links.push(selfLink);

    if (id === 0) {
      selfLink.rel.push('first');
    } else if (id === 1) {
      links.push({
        rel: ['first', 'previous'],
        href: this.urls.item(0)
      });
    } else {
      links.push(
        {
          rel: ['first'],
          href: this.urls.item(0)
        },
        {
          rel: ['previous'],
          href: this.urls.item(id - 1)
        }
      );
    }

    links.push(
      {
        rel: ['next'],
        href: this.urls.item(id + 1)
      },
      {
        rel: ['collection', 'up'],
        href: this.urls.items
      }
    );

    const entity = Entity.of({
      class: ['item'],
      title: `Item ${id}`,
      properties: {
        id
      },
      links
    });

    return entity;
  }
}
