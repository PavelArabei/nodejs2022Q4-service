import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({ example: 'cool name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 125 })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88  |  null',
    nullable: true,
  })
  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88  |  null',
    nullable: true,
  })
  @IsOptional()
  @Validate(IsUuidOrNullable)
  albumId: string | null;
}
