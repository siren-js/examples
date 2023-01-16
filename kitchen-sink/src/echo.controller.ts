import { Controller, Get, Query } from '@nestjs/common';
import { Entity } from '@siren-js/core';

import { UrlProvider } from './url.provider';

@Controller('echo')
export class EchoController {
  constructor(private readonly urls: UrlProvider) {}

  @Get()
  echoGet(@Query() query: any) {
    return Entity.of({
      title: 'Echo',
      properties: { ...query },
      links: [
        { rel: ['self'], href: this.urls.echo },
        { rel: ['index', 'up'], href: this.urls.baseUrl }
      ]
    });
  }
}
