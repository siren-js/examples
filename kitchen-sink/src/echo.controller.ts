import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Entity } from '@siren-js/core';

import { SirenContent } from './siren-content.decorator';
import { UrlProvider } from './url.provider';

@Controller('echo')
export class EchoController {
  constructor(private readonly urls: UrlProvider) {}

  @Get()
  @SirenContent()
  echoGet(@Query() query: Record<string, string[]>) {
    return Entity.of({
      title: 'Echo GET',
      properties: query,
      links: [
        { rel: ['self'], href: this.urls.echo },
        { rel: ['index', 'up'], href: this.urls.baseUrl }
      ]
    });
  }

  @Post()
  @SirenContent()
  echoPost(@Body() body: Record<string, string[]>) {
    return Entity.of({
      title: 'Echo POST',
      properties: body,
      links: [
        { rel: ['self'], href: this.urls.echo },
        { rel: ['index', 'up'], href: this.urls.baseUrl }
      ]
    });
  }
}
