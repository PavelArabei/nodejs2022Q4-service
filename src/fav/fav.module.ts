import { Module } from "@nestjs/common";
import { FavService } from "./fav.service";
import { FavController } from "./fav.controller";
import { TrackService } from "../track/track.service";

@Module({
  controllers: [FavController],
  providers: [FavService,TrackService],
})
export class FavModule {}
