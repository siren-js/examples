import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlProvider {
  constructor(private readonly config: ConfigService) {}

  get baseUrl(): string {
    return this.config.get('BASE_URL');
  }

  get about(): string {
    return `${this.baseUrl}/about`;
  }

  get author(): string {
    return `${this.baseUrl}/author`;
  }

  get echo(): string {
    return `${this.baseUrl}/echo`;
  }

  get plainText(): string {
    return `${this.baseUrl}/plain-text`;
  }

  get items(): string {
    return `${this.baseUrl}/items`;
  }

  item(id: number): string {
    return `${this.items}/${id}`;
  }
}
