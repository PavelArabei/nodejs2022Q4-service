import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { v4 } from "uuid";
import { DbService } from "../db/db.service";
import { User } from "./entities/user.entity";
import { ForbiddenException } from "../exceptions/forbiddenException";

@Injectable()
export class UserService {
  constructor(private db: DbService) {
  }

  async create(userDto: CreateUserDto) {
    const user = this.newUser(userDto);
    return this.db.user.create(user);
  }

  async findAll() {
    return await this.db.user.findAll();
  }

  async findOne(id: string) {
    const user = await this.db.user.findOne(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException("oldPassword is wrong");
    }

    const newUser = this.updateUser(user, updateUserDto);
    return this.db.user.update(newUser);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.db.user.remove(id);
  }

  private newUser({ login, password }: CreateUserDto): User {
    const id = v4();
    const createdAt = +new Date();

    const version = 1;
    return {
      id,
      login,
      password,
      createdAt,
      version,
      updatedAt: createdAt
    };
  }

  private updateUser(user: User, updateUserDto: UpdateUserDto): User {
    const updatedAt = +new Date();
    return {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt
    };
  }
}
