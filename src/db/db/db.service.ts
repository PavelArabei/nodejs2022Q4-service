import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { Users } from './db.model';

@Injectable()
export class DbService {
  private USERS: Users = {};

  public findAll() {
    return this.USERS;
  }
  public findOne(id: string) {
    return this.USERS[id];
  }
  public create(user: User) {
    return (this.USERS[user.id] = user);
  }
  public update(user: User) {
    return (this.USERS[user.id] = user);
  }
  public remove(id: string) {
    return delete this.USERS[id];
  }
}
