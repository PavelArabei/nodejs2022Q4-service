import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Album } from "../../album/entities/album.entity";

@Entity({ name: "favAlbum" })
export class FavAlbumEntity {
  @PrimaryColumn("uuid")
  id: string;

  @OneToOne(() => Album, { onDelete: "CASCADE" })
  @JoinColumn()
  album: Album;
}