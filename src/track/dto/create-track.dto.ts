import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;

  @IsNotEmpty()
  @IsOptional()
  @Validate(IsUuidOrNullable)
  albumId: string | null;
}
