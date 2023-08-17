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
import { AuthModule } from "@app/auth/auth.module";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { MyLoggingService } from "@app/logging/logging.service";
import { LoggingInterceptor } from "@app/interseptors/logging.interseptor.ts/logging.interceptor";
import { LoggingExceptionsFilter } from "@app/logging/logging-exceptions.filter";
import { AtGuard } from "@app/auth/guards/at.guard";


@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    DbModule.forRoot(),
    UserModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MyLoggingService,
    LoggingInterceptor,
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionsFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ]
})
export class AppModule {
}
