import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUuidOrNullable } from '../../validators/IsUuidOrNullable';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'cool name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '125' })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  @IsNotEmpty()
  @IsOptional()
  @Validate(IsUuidOrNullable)
  artistId: string | null;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  @IsNotEmpty()
  @IsOptional()
  @Validate(IsUuidOrNullable)
  albumId: string | null;
}
