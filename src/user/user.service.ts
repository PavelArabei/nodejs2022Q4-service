import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DbService } from "../db/db.service";
import { ForbiddenException } from "../exceptions/forbiddenException";
import { compare } from "bcrypt";


@Injectable()
export class UserService {
  constructor(private db: DbService) {
  }

  async create(userDto: CreateUserDto) {
    return this.db.user.create(userDto);
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
    const isPasswordTheSame = await compare(updateUserDto.oldPassword, user.password);
    if (!isPasswordTheSame) {
      throw new ForbiddenException("oldPassword is wrong");
    }
    return this.db.user.update(user, updateUserDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.db.user.remove(id);
  }

}
