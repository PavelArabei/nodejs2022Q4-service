import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { IsUUIDDto } from "../dto/UUID.dto";
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
import { BadRequest } from "../dto/badRequest";
import { NotFoundDto } from "../dto/notFound.dto";
import { Artist } from "./entities/artist.entity";

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: Artist })
  @ApiBody({ type: CreateArtistDto })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Artist],
    description: 'get all artists',
  })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Artist,
    description: 'get current artist',
  })
  @ApiNotFoundResponse({ type: NotFoundDto })
  async findOne(@Param() { id }: IsUUIDDto) {
    return await this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiOkResponse({ type: Artist, description: 'update artist' })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiBody({ type: UpdateArtistDto })
  async update(@Param() { id }: IsUUIDDto, @Body() updateArtistDto: UpdateArtistDto) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: IsUUIDDto) {
    return await this.artistService.remove(id);
  }
}
