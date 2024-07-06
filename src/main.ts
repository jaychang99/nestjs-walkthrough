import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerTimestamp } from 'src/common/middleware/logger-timestamp.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerTimestamp); // global middleware (only available with functional middleware)

  await app.listen(8000);
}
bootstrap();
