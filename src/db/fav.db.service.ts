import { Injectable } from '@nestjs/common';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Favs } from '../fav/entities/favs.entity';

@Injectable()
export class FavDBService {
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];

  findAll(): Favs {
    return { artists: this.artists, albums: this.albums, tracks: this.tracks };
  }
  addTrackToFavorites(track: Track) {
    this.tracks.push(track);
  }
  addAlbumToFavorites(album: Album) {
    this.albums.push(album);
  }
  addArtistToFavorites(artist: Artist) {
    this.artists.push(artist);
  }
  find(id: string, type: keyof Favs) {
    if (type === 'artists')
      return this.artists.find((artist) => artist.id === id);
    if (type === 'tracks')
      return this.tracks.find((tracks) => tracks.id === id);
    if (type === 'albums')
      return this.albums.find((albums) => albums.id === id);
  }

  remove(id: string, type: keyof Favs) {
    if (type === 'artists')
      this.artists = this.artists.filter((artist) => artist.id !== id);
    if (type === 'tracks')
      this.tracks = this.tracks.filter((tracks) => tracks.id !== id);
    if (type === 'albums')
      this.albums = this.albums.filter((albums) => albums.id !== id);
  }
}
