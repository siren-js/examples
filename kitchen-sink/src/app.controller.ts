import { Controller, Get } from '@nestjs/common';
import { Entity } from '@siren-js/core';

import { UrlProvider } from './url.provider';

@Controller()
export class AppController {
  constructor(private readonly urls: UrlProvider) {}

  @Get()
  index() {
    return Entity.of({
      title: 'Root',
      properties: {
        foo: 'bar',
        bar: 42,
        baz: false
      },
      links: [
        { rel: ['self'], href: this.urls.baseUrl },
        { rel: ['about'], href: this.urls.about, title: 'About' }
      ],
      actions: [
        {
          name: 'echo-get',
          href: this.urls.echo,
          fields: [
            { name: 'sneaky', type: 'hidden', value: 'boo!' },
            { name: 'foo', type: 'text', required: true },
            { name: 'query', type: 'search' },
            { name: 'phone', type: 'tel' },
            { name: 'homepage', type: 'url' },
            { name: 'email', type: 'email' },
            { name: 'password', type: 'password' },
            { name: 'tomorrow', type: 'date' },
            { name: 'lastMonth', type: 'month' },
            { name: 'nextWeek', type: 'week' },
            { name: 'dinnerTime', type: 'time' },
            { name: 'midnight', type: 'datetime-local' },
            { name: 'favoriteNumber', type: 'number' }
            // { name: '', type: 'range'},
            // { name: '', type: 'color'},
            // { name: '', type: 'checkbox'},
            // { name: 'sex', type: 'radio'},
          ]
        }
      ]
    });
  }

  @Get('about')
  about() {
    return Entity.of({
      title: 'About',
      properties: {
        name: 'Kitchen Sink API',
        description: 'This is a Siren API demonstrating all the different components of Siren.',
        implementedWith: ['NestJS', 'Siren.js']
      },
      links: [
        { rel: ['self'], href: this.urls.about },
        { rel: ['index', 'up'], href: this.urls.baseUrl }
      ]
    });
  }
}
