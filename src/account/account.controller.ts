import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getAccountInfo(@HostParam('account') account: string): string {
    return `This account is for ${account} account`;
  }
}
