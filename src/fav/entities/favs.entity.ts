import { Track } from "../../track/entities/track.entity";
import { Artist } from "../../artist/entities/artist.entity";
import { Album } from "../../album/entities/album.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Favs {
  id: string;


  @ApiProperty({
    type: [Artist],
    example: [
      {
        id: "69db9eb3-4000-4eab-85c1-da409c656e88",
        name: "Awesome name",
        grammy: false
      }
    ]
  })
  artists: Artist[];

  @ApiProperty({
    type: [Album],
    example: [
      {
        id: "69db9eb3-4000-4eab-85c1-da409c656e88",
        name: "Awesome name",
        year: 2002,
        artistId: null
      }
    ]
  })
  albums: Album[];

  @ApiProperty({
    type: [Track],
    example: [
      {
        id: "69db9eb3-4000-4eab-85c1-da409c656e88",
        name: "Awesome name",
        artistId: null,
        albumId: null,
        duration: 125
      }
    ]
  })
  tracks: Track[];
}
