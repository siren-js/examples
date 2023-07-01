import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlProvider {
  constructor(private readonly config: ConfigService) {}

  readonly base = this.config.get<string>('BASE_URL');
  readonly cards = this.withBase('/cards');

  card(id: number): string {
    return `${this.cards}/${id}`;
  }

  private withBase(path: string): string {
    return new URL(path, this.base).href;
  }
}
