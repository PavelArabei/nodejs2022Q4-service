import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserDBService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async update(user: User): Promise<User> {
    return await this.create(user);
  }

  public async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
