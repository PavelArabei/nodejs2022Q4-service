import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsNotEqualTo } from '../../validators/isNotEqualTo';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsNotEqualTo, ['oldPassword'], {
    message: 'newPassword must be different from oldPassword',
  })
  newPassword: string;
}
