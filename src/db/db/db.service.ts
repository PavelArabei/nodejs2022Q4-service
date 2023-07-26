import { Injectable } from '@nestjs/common';
import { userDBService } from './user.db.service';

@Injectable()
export class DbService {
  constructor(private userDBService: userDBService) {}

  get user(): userDBService {
    return this.userDBService;
  }
}
