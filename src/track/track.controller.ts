import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
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
import { Track } from "./entities/track.entity";
import { NotFoundDto } from "../dto/notFound.dto";
import { BadRequest } from "../dto/badRequest";

@ApiTags("track")
@Controller("track")
export class TrackController {
  constructor(private readonly trackService: TrackService) {
  }

  @Post()
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: Track })
  @ApiBody({ type: CreateTrackDto })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Track],
    description: "get all tracks"
  })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({
    type: Track,
    description: "get current track"
  })
  @ApiNotFoundResponse({ type: NotFoundDto })
  async findOne(@Param() { id }: IsUUIDDto) {
    return await this.trackService.findOne(id);
  }

  @Put(":id")
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiOkResponse({ type: Track, description: "update track" })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiBody({ type: UpdateTrackDto })
  async update(@Param() { id }: IsUUIDDto, @Body() updateTrackDto: UpdateTrackDto) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(":id")
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: IsUUIDDto) {
    return await this.trackService.remove(id);
  }
}
