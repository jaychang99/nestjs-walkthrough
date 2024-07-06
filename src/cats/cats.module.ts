import { Module } from '@nestjs/common';
import { CatsController } from 'src/cats/cats.controller';
import { CatsService } from 'src/cats/cats.service';

@Module({
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
