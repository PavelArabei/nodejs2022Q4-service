import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Track } from '../track/entities/track.entity';
import { UnprocessableEntity } from '../exceptions/unprocessableEntity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

const createdMessage = (name: string) => `${name} has been added to favorites`;
const deletedMessage = (name: string) =>
  `${name} has been deleted from favorites`;

@Injectable()
export class FavService {
  constructor(private readonly db: DbService) {}
  findAll() {
    return this.db.fav.findAll();
  }

  addTrackToFavorites(id: string) {
    const track: Track = this.db.track.findOne(id);
    if (!track) throw new UnprocessableEntity('Track not found');

    this.db.fav.addTrackToFavorites(track);
    return createdMessage('Track');
  }

  removeTrackFromFavorites(id: string) {
    const track = this.db.fav.find(id, 'tracks');
    if (!track) throw new UnprocessableEntity('Track not found');

    this.db.fav.remove(id, 'tracks');
    return deletedMessage('Track');
  }

  addArtistToFavorites(id: string) {
    const artist: Artist = this.db.artist.findOne(id);
    if (!artist) throw new UnprocessableEntity('Artist not found');

    this.db.fav.addArtistToFavorites(artist);
    return createdMessage('Artist');
  }

  removeArtistFromFavorites(id: string) {
    const artist = this.db.fav.find(id, 'artists');
    if (!artist) throw new UnprocessableEntity('Artist not found');

    this.db.fav.remove(id, 'artists');
    return deletedMessage('Artist');
  }

  addAlbumToFavorites(id: string) {
    const album: Album = this.db.album.findOne(id);
    if (!album) throw new UnprocessableEntity('Artist not found');

    this.db.fav.addAlbumToFavorites(album);
    return createdMessage('Album');
  }

  removeAlbumFromFavorites(id: string) {
    const album = this.db.fav.find(id, 'albums');
    if (!album) throw new UnprocessableEntity('Album not found');

    this.db.fav.remove(id, 'albums');
    return deletedMessage('Album');
  }
}
