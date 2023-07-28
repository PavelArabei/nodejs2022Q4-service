import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsNotEqualTo } from '../../validators/isNotEqualTo';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'bla-bla' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'new password must be different from old password',
    example: 'bla-bla-bla',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotEqualTo, ['oldPassword'], {
    message: 'newPassword must be different from oldPassword',
  })
  newPassword: string;
}
