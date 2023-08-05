import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { FavService } from "./fav.service";
import { IsUUIDDto } from "../dto/UUID.dto";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { Favs } from "./entities/favs.entity";
import { BadRequest } from "../dto/badRequest";
import { UnprocessableDto } from "../dto/unprocessable.dto";
import { NotFoundDto } from "../dto/notFound.dto";

@ApiTags("favs")
@Controller("favs")
export class FavController {
  constructor(private readonly favService: FavService) {
  }

  @Get()
  @ApiOkResponse({
    type: Favs,
    description: "get favs"
  })
  async findAll() {
    return await this.favService.findAll();
  }

  @Post("track/:id")
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: String })
  @ApiUnprocessableEntityResponse({ type: UnprocessableDto })
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(@Param() { id }: IsUUIDDto): Promise<string> {
    return await this.favService.addTrackToFavorites(id);
  }

  @Delete("track/:id")
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param() { id }: IsUUIDDto): Promise<string> {
    return await this.favService.removeTrackFromFavorites(id);
  }

  @Post("artist/:id")
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: String })
  @ApiUnprocessableEntityResponse({ type: UnprocessableDto })
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(@Param() { id }: IsUUIDDto): Promise<string> {
    return await this.favService.addArtistToFavorites(id);
  }

  @Delete("artist/:id")
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param() { id }: IsUUIDDto): Promise<string> {
    return await this.favService.removeArtistFromFavorites(id);
  }

  @Post("album/:id")
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: String })
  @ApiUnprocessableEntityResponse({ type: UnprocessableDto })
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param() { id }: IsUUIDDto): Promise<string> {
    return await this.favService.addAlbumToFavorites(id);
  }

  @Delete("album/:id")
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param() { id }: IsUUIDDto): Promise<string> {
    return await this.favService.removeAlbumFromFavorites(id);
  }
}
