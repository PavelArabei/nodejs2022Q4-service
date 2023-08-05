import { Global, Module } from "@nestjs/common";
import { DbService } from "./db.service";
import { TrackDBService } from "./track.db.service";
import { UserDBService } from "./user.db.service";
import { ArtistDbService } from "./artist.db.service";
import { AlbumDbService } from "./album.db.service";
import { FavDBService } from "./fav.db.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Artist } from "../artist/entities/artist.entity";
import { Album } from "../album/entities/album.entity";
import { Track } from "../track/entities/track.entity";
import { FavArtistEntity } from "../fav/entities/favArtist.entity";
import { FavTrackEntity } from "../fav/entities/favTrack.entity";
import { FavAlbumEntity } from "../fav/entities/favAlbum.entity";

@Global()
@Module({
  providers: [DbService],
  exports: [DbService]
})
export class DbModule {
  static forRoot(): any {
    return {
      module: DbModule,
      imports: [TypeOrmModule.forFeature([User, Track, Artist, Album, FavArtistEntity, FavTrackEntity, FavAlbumEntity])
      ],
      providers: [
        DbService,
        UserDBService,
        TrackDBService,
        ArtistDbService,
        AlbumDbService,
        FavDBService
      ],
      exports: [DbService]
    };
  }
}
