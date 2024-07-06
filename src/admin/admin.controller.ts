import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';

@Controller({ host: 'admin.example.com' })
export class AdminController {
  constructor(private catsService: CatsService) {
    console.log('catsService', catsService);
  }

  @Get()
  index(): string {
    return `Admin Page`;
  }
}
