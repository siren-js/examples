import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAddresses(): string {
    const a = { one: 'prettier' };
    return 'Hello World!';
  }
}
