import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlProvider {
  constructor(private readonly config: ConfigService) {}

  get baseUrl(): string {
    return this.config.get('BASE_URL');
  }

  get profile(): string {
    return `${this.baseUrl}/profile`;
  }

  get tasks(): string {
    return `${this.baseUrl}/tasks`;
  }

  task(id: number): string {
    return `${this.baseUrl}/tasks/${id}`;
  }
}
