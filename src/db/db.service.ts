import { TrackDBService } from './track.db.service';
import { Injectable } from '@nestjs/common';
import { UserDBService } from './user.db.service';
import { ArtistDbService } from './artist.db.service';
import { AlbumDbService } from './album.db.service';
import { FavDBService } from './fav.db.service';

@Injectable()
export class DbService {
  constructor(
    private readonly userDBService: UserDBService,
    private readonly trackDBService: TrackDBService,
    private readonly artistDbService: ArtistDbService,
    private readonly albumDbService: AlbumDbService,
    private readonly favDBService: FavDBService,
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
  get album(): AlbumDbService {
    return this.albumDbService;
  }
  get fav(): FavDBService {
    return this.favDBService;
  }
}
