import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('profile')
  root() {
    // intentionally left blank; Nest handles the logic
  }
}
