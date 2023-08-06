import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "./orm.config";

import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TrackModule } from "./track/track.module";
import { AlbumModule } from "./album/album.module";
import { ArtistModule } from "./artist/artist.module";
import { DbModule } from "./db/db.module";
import { FavModule } from "./fav/fav.module";

import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    DbModule.forRoot(),
    UserModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
