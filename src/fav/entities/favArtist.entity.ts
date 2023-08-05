import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Artist } from "../../artist/entities/artist.entity";

@Entity({ name: "favArtist" })
export class FavArtistEntity {
  @PrimaryColumn("uuid")
  id: string;

  @OneToOne(() => Artist, { onDelete: "CASCADE" })
  @JoinColumn()
  artist: Artist;
}