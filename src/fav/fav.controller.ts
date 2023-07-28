import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavService } from './fav.service';
import { IsUUIDDto } from '../dto/UUID.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}
  @Get()
  async findAll() {
    return this.favService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.removeTrackFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param() { id }: IsUUIDDto) {
    return this.favService.removeAlbumFromFavorites(id);
  }
}
