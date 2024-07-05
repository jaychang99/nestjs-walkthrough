import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from 'src/cats/cats.controller';
import { AdminController } from 'src/admin/admin.controller';
import { AccountController } from 'src/account/account.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatsController,
    AdminController,
    AccountController,
  ],
  providers: [AppService],
})
export class AppModule {}
