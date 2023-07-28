import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;
}
