import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IsUUIDDto {
  @ApiProperty({
    description: 'uuid format',
    example: '69db9eb3-4000-4eab-85c1-da409c656e88',
  })
  @IsUUID('4', { message: 'Invalid UUID format' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
