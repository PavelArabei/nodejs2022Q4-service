import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [DbModule.forRoot(), UserModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
