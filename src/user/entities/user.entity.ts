import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

//export type UserWithoutPassword = Omit<User, 'password'>;
export class UserWithoutPassword {
  @ApiProperty({ example: "69db9eb3-4000-4eab-85c1-da409c656e88" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: "Awesome name" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  version: number;

  @ApiProperty({ example: 1690575786106 })
  @IsNumber()
  @IsNotEmpty()
  createdAt: number;

  @ApiProperty({ example: 1690575786106 })
  @IsNumber()
  @IsNotEmpty()
  updatedAt: number;
}

export class User extends UserWithoutPassword {
  @ApiProperty({ example: "Very strong password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
