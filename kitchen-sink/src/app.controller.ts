import { Controller, Get, Header } from '@nestjs/common';
import { Entity } from '@siren-js/core';

import { SirenContent } from './siren-content.decorator';
import { UrlProvider } from './url.provider';

@Controller()
export class AppController {
  constructor(private readonly urls: UrlProvider) {}

  @Get()
  @SirenContent()
  index() {
    return Entity.of({
      class: ['home', 'index'],
      title: 'Home',
      properties: {
        description: 'This is the root of the kitchen sink Siren API example',
        author: 'Dillon Redding'
      },
      links: [
        { rel: ['self'], href: this.urls.baseUrl },
        { rel: ['about'], href: this.urls.about, title: 'About' },
        { rel: ['foo'], class: ['Text'], href: this.urls.plainText, title: 'Non-Siren' }
      ],
      actions: [
        {
          name: 'drop-downs',
          href: this.urls.echo,
          title: 'Drop-downs',
          fields: [
            {
              name: 'no-default',
              type: 'radio',
              options: [
                { title: 'Gryffindor', value: 'g' },
                { title: 'Hufflepuff', value: 'h' },
                { title: 'Ravenclaw', value: 'r' },
                { title: 'Slytherin', value: 's' }
              ]
            },
            {
              name: 'no-title',
              type: 'radio',
              options: [
                { value: 'Gryffindor' },
                { value: 'Hufflepuff' },
                { value: 'Ravenclaw' },
                { value: 'Slytherin' }
              ]
            },
            {
              name: 'default-from-list',
              type: 'radio',
              value: 'r',
              options: [
                { title: 'Gryffindor', value: 'g' },
                { title: 'Hufflepuff', value: 'h' },
                { title: 'Ravenclaw', value: 'r' },
                { title: 'Slytherin', value: 's' }
              ]
            },
            {
              name: 'default-not-from-list',
              type: 'radio',
              value: 'd',
              options: [
                { title: 'Gryffindor', value: 'g' },
                { title: 'Hufflepuff', value: 'h' },
                { title: 'Ravenclaw', value: 'r' },
                { title: 'Slytherin', value: 's' }
              ]
            }
          ]
        },
        {
          name: 'echo-get',
          href: this.urls.echo,
          title: 'Echo GET',
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
            { name: 'midnight', type: 'date-time' },
            { name: 'favoriteNumber', type: 'number' },
            {
              name: 'hogwartsHouse',
              type: 'radio',
              options: [
                { title: 'Gryffindor', value: 'gryffindor' },
                { title: 'Hufflepuff', value: 'hufflepuff' },
                { title: 'Ravenclaw', value: 'ravenclaw' },
                { title: 'Slytherin', value: 'slytherin' }
              ]
            },
            { name: 'avatar', type: 'file' },
            { name: 'agree', type: 'checkbox', title: 'I agree to something' }
          ]
        },
        {
          name: 'echo-post',
          method: 'POST',
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
            { name: 'midnight', type: 'date-time' },
            { name: 'favoriteNumber', type: 'number' }
          ]
        },
        {
          name: 'upload-file',
          class: ['Upload', 'MultipartForm'],
          method: 'POST',
          href: this.urls.upload,
          type: 'multipart/form-data',
          fields: [{ name: 'logo', type: 'file' }]
        }
      ],
      entities: [
        {
          rel: ['items'],
          href: this.urls.items,
          title: 'Items'
        },
        {
          rel: ['author'],
          class: ['person'],
          properties: {
            givenName: 'Dillon',
            familyName: 'Redding'
          },
          links: [
            {
              rel: ['self'],
              href: this.urls.author
            }
          ]
        }
      ]
    });
  }

  @Get('about')
  @SirenContent()
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
        { rel: ['index', 'up'], href: this.urls.baseUrl },
        { rel: ['author'], href: this.urls.author }
      ]
    });
  }

  @Get('plain-text')
  @Header('Content-Type', 'text/plain')
  plainText() {
    return 'Hello, Siren!';
  }
}
