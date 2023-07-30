import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';

@Module({
  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {}
