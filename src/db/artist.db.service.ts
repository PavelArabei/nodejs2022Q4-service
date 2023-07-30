import { Injectable } from '@nestjs/common';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class ArtistDbService {
  private ARTISTS: Artist[] = [];

  public findAll(): Artist[] {
    return this.ARTISTS;
  }
  public findOne(id: string): Artist {
    return this.ARTISTS.find((artist) => artist.id === id);
  }
  public create(artist: Artist): Artist {
    this.ARTISTS.push(artist);
    return artist;
  }
  public update(artist: Artist): Artist {
    const UpdatedArtist: Artist = this.ARTISTS.find(
      (el: Artist) => el.id === artist.id,
    );

    for (const updatedArtistKey in artist) {
      UpdatedArtist[updatedArtistKey] = artist[updatedArtistKey];
    }
    return UpdatedArtist;
  }
  public remove(id: string): void {
    this.ARTISTS = this.ARTISTS.filter((artist) => artist.id !== id);
  }
}
