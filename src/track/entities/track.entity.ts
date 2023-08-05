import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tracks" })
export class Track {
  @PrimaryColumn()
  @ApiProperty({ example: "69db9eb3-4000-4eab-85c1-da409c656e88" })
  id: string;

  @Column()
  @ApiProperty({ example: "Awesome name" })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: "69db9eb3-4000-4eab-85c1-da409c656e88",
    nullable: true
  })
  artistId: string | null;

  @Column({ nullable: true })
  @ApiProperty({
    example: "69db9eb3-4000-4eab-85c1-da409c656e88",
    nullable: true
  })
  albumId: string | null;

  @Column()
  @ApiProperty({ example: 100 })
  duration: number;

}
