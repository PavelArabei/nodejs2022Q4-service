import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IsUUIDDto } from "../dto/UUID.dto";
import { User, UserWithoutPassword } from "./entities/user.entity";
import { StatusCodes } from "http-status-codes";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { NotFoundDto } from "../dto/notFound.dto";
import { BadRequest } from "../dto/badRequest";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: UserWithoutPassword })
  @ApiBody({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return this.putAwayPassword(user);
  }

  @Get()
  @ApiOkResponse({
    type: [UserWithoutPassword],
    description: 'get all users',
  })
  findAll() {
    const allUsers = this.userService.findAll();
    return allUsers.map((user) => this.putAwayPassword(user));
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserWithoutPassword,
    description: 'get current users',
  })
  @ApiNotFoundResponse({ type: NotFoundDto })
  findOne(@Param() { id }: IsUUIDDto) {
    const user = this.userService.findOne(id);
    return this.putAwayPassword(user);
  }

  @Put(':id')
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiOkResponse({ type: UserWithoutPassword, description: 'update user' })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiBody({ type: UpdateUserDto })
  update(@Param() { id }: IsUUIDDto, @Body() updateUserDto: UpdateUserDto) {
    const newUser = this.userService.update(id, updateUserDto);
    return this.putAwayPassword(newUser);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(StatusCodes.NO_CONTENT)
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
