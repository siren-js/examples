import { Controller, Get } from '@nestjs/common';
import { Entity } from '@siren-js/core';

import { SirenContent } from './siren-content.decorator';
import { UrlProvider } from './url.provider';

@Controller('author')
export class AuthorController {
  constructor(private readonly urls: UrlProvider) {}

  @Get()
  @SirenContent()
  index() {
    return Entity.of({
      class: ['person', 'author'],
      title: 'Author',
      properties: {
        givenName: 'Dillon',
        familyName: 'Redding'
      },
      links: [
        {
          rel: ['self'],
          href: this.urls.author
        },
        {
          rel: ['index', 'up'],
          href: this.urls.baseUrl,
          title: 'Home'
        }
      ]
    });
  }
}
