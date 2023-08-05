import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Track } from "../../track/entities/track.entity";

@Entity({ name: "favTrack" })
export class FavTrackEntity {
  @PrimaryColumn("uuid")
  id: string;

  @OneToOne(() => Track, { onDelete: "CASCADE" })
  @JoinColumn()
  track: Track;
}