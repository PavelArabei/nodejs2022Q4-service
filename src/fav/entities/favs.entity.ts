import { Track } from '../../track/entities/track.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

export class Favs {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
