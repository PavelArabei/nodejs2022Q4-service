import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;
}
