import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserDBService {
  private USERS: User[] = [];

  public findAll(): User[] {
    return this.USERS;
  }
  public findOne(id: string): User {
    return this.USERS.find((user) => user.id === id);
  }
  public create(user: User): User {
    this.USERS.push(user);
    return user;
  }
  public update(user: User): User {
    const UpdatedUser: User = this.USERS.find((u: User) => u.id === user.id);

    for (const updatedUserKey in user) {
      UpdatedUser[updatedUserKey] = user[updatedUserKey];
    }
    return UpdatedUser;
  }
  public remove(id: string): void {
    this.USERS = this.USERS.filter((user) => user.id !== id);
    return;
  }
}
