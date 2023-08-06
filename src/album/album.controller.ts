import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { StatusCodes } from "http-status-codes";
import { IsUUIDDto } from "../dto/UUID.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { BadRequest } from "../dto/badRequest";
import { NotFoundDto } from "../dto/notFound.dto";
import { Album } from "./entities/album.entity";

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: Album })
  @ApiBody({ type: CreateAlbumDto })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Album],
    description: 'get all albums',
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Album,
    description: 'get current album',
  })
  @ApiNotFoundResponse({ type: NotFoundDto })
  async findOne(@Param() { id }: IsUUIDDto) {
    return await  this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiOkResponse({ type: Album, description: 'update album' })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiBody({ type: UpdateAlbumDto })
  async update(@Param() { id }: IsUUIDDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: IsUUIDDto) {
    return await this.albumService.remove(id);
  }
}
