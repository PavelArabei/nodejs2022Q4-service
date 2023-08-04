import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "albums" })
export class Album {
  @PrimaryColumn()
  @ApiProperty({ example: "69db9eb3-4000-4eab-85c1-da409c656e88" })
  @IsNotEmpty()
  id: string;

  @Column()
  @ApiProperty({ example: "Awesome name" })
  name: string;

  @Column()
  @ApiProperty({ example: 2000 })
  year: number;

  @Column({ nullable: true })
  @ApiProperty({
    example: "69db9eb3-4000-4eab-85c1-da409c656e88",
    nullable: true
  })
  artistId: string | null;
}
