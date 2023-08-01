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

@ApiTags('favs')
@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}
  @Get()
  @ApiOkResponse({
    type: Favs,
    description: 'get favs',
  })
  async findAll() {
    return this.favService.findAll();
  }

  @Post('track/:id')
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: String })
  @ApiUnprocessableEntityResponse({ type: UnprocessableDto })
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.removeTrackFromFavorites(id);
  }

  @Post('artist/:id')
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: String })
  @ApiUnprocessableEntityResponse({ type: UnprocessableDto })
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  @ApiBadRequestResponse({ type: BadRequest })
  @ApiCreatedResponse({ type: String })
  @ApiUnprocessableEntityResponse({ type: UnprocessableDto })
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.removeAlbumFromFavorites(id);
  }
}
