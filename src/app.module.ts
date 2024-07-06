import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from 'src/admin/admin.controller';
import { AccountController } from 'src/account/account.controller';
import { HttpService } from 'src/http/http.service';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController, AccountController],
  providers: [AppService, HttpService],
})
export class AppModule {}
