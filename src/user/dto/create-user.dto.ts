import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'cool name' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'cool password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
