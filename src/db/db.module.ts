import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TrackDBService } from './track.db.service';
import { UserDBService } from './user.db.service';
import { ArtistDbService } from './artist.db.service';
import { AlbumDbService } from './album.db.service';
import { FavDBService } from './fav.db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(): any {
    return {
      module: DbModule,
      providers: [
        DbService,
        UserDBService,
        TrackDBService,
        ArtistDbService,
        AlbumDbService,
        FavDBService,
      ],
      exports: [DbService],
    };
  }
}
