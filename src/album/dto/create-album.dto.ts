import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Awesome name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  @IsNotEmpty()
  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;
}
