import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class userDBService {
  private USERS: User[] = [];

  public findAll() {
    return this.USERS;
  }
  public findOne(id: string) {
    return this.USERS.find((user) => user.id === id);
  }
  public create(user: User) {
    this.USERS.push(user);
    return user;
  }
  public update(user: User) {
    const UpdatedUser: User = this.USERS.find((u: User) => u.id === user.id);

    for (const updatedUserKey in user) {
      UpdatedUser[updatedUserKey] = user[updatedUserKey];
    }
    return UpdatedUser;
  }
  public remove(id: string) {
    this.USERS = this.USERS.filter((user) => user.id !== id);
    return;
  }
}
