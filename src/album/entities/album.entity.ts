import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ example: '69db9eb3-4000-4eab-85c1-da409c656e88' })
  id: string;

  @ApiProperty({ example: 'Awesome name' })
  name: string;

  @ApiProperty({ example: 2000 })
  year: number;

  @ApiProperty({
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
    nullable: true,
  })
  artistId: string | null;
}
