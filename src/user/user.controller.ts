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

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: UserWithoutPassword })
  @ApiBody({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    type: [UserWithoutPassword],
    description: "get all users"
  })
  async findAll(): Promise<UserWithoutPassword[]> {
    return await this.userService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({
    type: UserWithoutPassword,
    description: "get current users"
  })
  @ApiNotFoundResponse({ type: NotFoundDto })
  async findOne(@Param() { id }: IsUUIDDto): Promise<UserWithoutPassword> {
    return await this.userService.findOne(id);
  }

  @Put(":id")
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiOkResponse({ type: UserWithoutPassword, description: "update user" })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param() { id }: IsUUIDDto, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: IsUUIDDto): Promise<void> {
    await this.userService.remove(id);
  }

}
