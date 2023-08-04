import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

//export type UserWithoutPassword = Omit<User, 'password'>;

export class UserWithoutPassword {
  @PrimaryColumn()
  @ApiProperty({ example: "69db9eb3-4000-4eab-85c1-da409c656e88" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Column()
  @ApiProperty({ example: "Awesome name" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @Column()
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  version: number;

  @Column({ type: "bigint" })
  @ApiProperty({ example: 1690575786106 })
  @IsNumber()
  @IsNotEmpty()
  createdAt: number;

  @Column({ type: "bigint" })
  @ApiProperty({ example: 1690575786106 })
  @IsNumber()
  @IsNotEmpty()
  updatedAt: number;
}

@Entity({ name: "users" })
export class User extends UserWithoutPassword {

  @Column()
  @ApiProperty({ example: "Very strong password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
