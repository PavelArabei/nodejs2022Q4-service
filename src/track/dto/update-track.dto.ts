import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;

  @IsOptional()
  @Validate(IsUuidOrNullable)
  albumId: string | null;
}
