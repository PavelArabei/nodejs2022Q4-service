import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ example: '69db9eb3-4000-4eab-85c1-da409c656e88' })
  id: string;

  @ApiProperty({ example: 'Awesome name' })
  name: string;

  @ApiProperty({ example: false })
  grammy: boolean;
}
