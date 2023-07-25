import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';
import { DbService } from '../db/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}
  create(userDto: CreateUserDto) {
    const user = this.newUser(userDto);
    return this.db.create(user);
  }

  findAll() {
    return this.db.findAll();
  }

  findOne(id: string) {
    const user = this.db.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    const newUser = this.updateUser(user, updateUserDto);
    return this.db.update(newUser);
  }

  remove(id: string) {
    const user = this.db.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.db.remove(id);
  }

  private newUser({ login, password }: CreateUserDto): User {
    const id = v4();
    const createdAt = +new Date();
    const version = 0;
    return {
      id,
      login,
      password,
      createdAt,
      version,
    };
  }

  private updateUser(user: User, updateUserDto: UpdateUserDto): User {
    const updatedAt = +new Date();
    return {
      ...user,
      ...updateUserDto,
      version: user.version + 1,
      updatedAt,
    };
  }
}
