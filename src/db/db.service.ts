import { TrackDBService } from './track.db.service';
import { Injectable } from '@nestjs/common';
import { UserDBService } from './user.db.service';
import { ArtistDbService } from './artist.db.service';

@Injectable()
export class DbService {
  constructor(
    private readonly userDBService: UserDBService,
    private readonly trackDBService: TrackDBService,
    private readonly artistDbService: ArtistDbService,
  ) {}

  get user(): UserDBService {
    return this.userDBService;
  }
  get track(): TrackDBService {
    return this.trackDBService;
  }
  get artist(): ArtistDbService {
    return this.artistDbService;
  }
}
