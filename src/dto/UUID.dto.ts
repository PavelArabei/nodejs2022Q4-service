import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IsUUIDDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
