import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TrackDBService } from './track.db.service';
import { UserDBService } from './user.db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(): any {
    return {
      module: DbModule,
      providers: [DbService, UserDBService, TrackDBService],
      exports: [DbService],
    };
  }
}
