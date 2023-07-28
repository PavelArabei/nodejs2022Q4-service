import { Album } from '../album/entities/album.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumDbService {
  private ALBUMS: Album[] = [];

  public findAll(): Album[] {
    return this.ALBUMS;
  }
  public findOne(id: string): Album {
    return this.ALBUMS.find((album) => album.id === id);
  }
  public find(id: string, type: keyof Album): Album | undefined {
    return this.ALBUMS.find((track) => track[type] === id);
  }
  public create(album: Album): Album {
    this.ALBUMS.push(album);
    return album;
  }
  public update(album: Album): Album {
    const UpdatedAlbum: Album = this.ALBUMS.find(
      (el: Album) => el.id === album.id,
    );

    for (const updatedAlbumKey in album) {
      UpdatedAlbum[updatedAlbumKey] = album[updatedAlbumKey];
    }
    return UpdatedAlbum;
  }
  public remove(id: string): void {
    this.ALBUMS = this.ALBUMS.filter((album) => album.id !== id);
  }
}
