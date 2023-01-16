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

  get echo(): string {
    return `${this.baseUrl}/echo`;
  }
}
