import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "artist" })
export class Artist {
  @PrimaryColumn()
  @ApiProperty({ example: "69db9eb3-4000-4eab-85c1-da409c656e88" })
  @IsNotEmpty()
  id: string;

  @Column()
  @ApiProperty({ example: "Awesome name" })
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty({ example: false })
  @IsNotEmpty()
  grammy: boolean;
}
