import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from 'src/cats/cats.controller';
import { AdminController } from 'src/admin/admin.controller';
import { AccountController } from 'src/account/account.controller';
import { CatsService } from 'src/cats/cats.service';
import { HttpService } from 'src/http/http.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatsController,
    AdminController,
    AccountController,
  ],
  providers: [AppService, CatsService, HttpService],
})
export class AppModule {}
