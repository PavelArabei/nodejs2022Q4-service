import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "@app/user/dto/create-user.dto";
import { v4 } from "uuid";
import { UpdateUserDto } from "@app/user/dto/update-user.dto";


@Injectable()
export class UserDBService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOneByDto({ login }: CreateUserDto) {
    return await this.userRepository.findOneBy({ login });
  }

  public async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    const user = this.newUser(userDto);
    return await this.save(user);
  }

  public async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const newUser = this.updateUser(user, updateUserDto);
    return await this.save(newUser);
  }

  public async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }


  private newUser({ login, password }: CreateUserDto): User {
    const newUser = new User();
    const id = v4();
    const createdAt = +new Date();
    const version = 1;
    return Object.assign(newUser, {
      id,
      login,
      password,
      createdAt,
      version,
      updatedAt: createdAt
    });

  }

  private updateUser(user: User, updateUserDto: UpdateUserDto): User {
    const newUser = new User();
    const updatedAt = +new Date();
    return Object.assign(newUser, {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt
    });
  }
}
