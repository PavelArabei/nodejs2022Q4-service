import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ example: 'Awesome name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;
}
