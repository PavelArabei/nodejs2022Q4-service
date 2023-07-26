import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUUIDDto } from '../dto/UUID.dto';
import { User, UserWithoutPassword } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return this.putAwayPassword(user);
  }

  @Get()
  findAll() {
    const allUsers = this.userService.findAll();
    return allUsers.map((user) => this.putAwayPassword(user));
  }

  @Get(':id')
  findOne(@Param() { id }: IsUUIDDto) {
    const user = this.userService.findOne(id);
    return this.putAwayPassword(user);
  }

  @Put(':id')
  update(@Param() { id }: IsUUIDDto, @Body() updateUserDto: UpdateUserDto) {
    const newUser = this.userService.update(id, updateUserDto);
    return this.putAwayPassword(newUser);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: IsUUIDDto) {
    this.userService.remove(id);
  }

  private putAwayPassword(user: User): UserWithoutPassword {
    const { password, ...fields }: User = user;
    return {
      ...fields,
    };
  }
}
