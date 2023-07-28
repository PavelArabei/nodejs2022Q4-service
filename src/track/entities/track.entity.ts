import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ example: '69db9eb3-4000-4eab-85c1-da409c656e88' })
  id: string;

  @ApiProperty({ example: 'Awesome name' })
  name: string;
  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({ example: 100 })
  duration: number;
}
