import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from 'src/admin/admin.controller';
import { AccountController } from 'src/account/account.controller';
import { HttpService } from 'src/http/http.service';
import { CatsModule } from 'src/cats/cats.module';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController, AccountController],
  providers: [AppService, HttpService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('cats') // route to exclude
      .forRoutes({ path: 'cats/*', method: RequestMethod.GET }); // route for this logger to be activated
  }
}
