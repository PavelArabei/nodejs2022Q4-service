import { TrackDBService } from './track.db.service';
import { Injectable } from '@nestjs/common';
import { UserDBService } from './user.db.service';

@Injectable()
export class DbService {
  constructor(
    private userDBService: UserDBService,
    private trackDBService: TrackDBService,
  ) {}

  get user(): UserDBService {
    return this.userDBService;
  }
  get track(): TrackDBService {
    return this.trackDBService;
  }
}
