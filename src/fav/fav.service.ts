import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { Track } from "../track/entities/track.entity";
import { UnprocessableEntity } from "../exceptions/unprocessableEntity";
import { Artist } from "../artist/entities/artist.entity";
import { Album } from "../album/entities/album.entity";

const createdMessage = (name: string) => `${name} has been added to favorites`;
const deletedMessage = (name: string) =>
  `${name} has been deleted from favorites`;

@Injectable()
export class FavService {
  constructor(private readonly db: DbService) {
  }

  async findAll() {
    return await this.db.fav.findAll();
  }

  async addTrackToFavorites(id: string) {
    const track: Track = await this.db.track.findOne(id);
    if (!track) throw new UnprocessableEntity("Track not found");

    await this.db.fav.addTrackToFavorites(track);
    return createdMessage("Track");
  }

  async removeTrackFromFavorites(id: string) {
    const track = await this.db.fav.find(id, "tracks");
    if (!track) throw new UnprocessableEntity("Track not found");

    await this.db.fav.remove(id, "tracks");
    return deletedMessage("Track");
  }

  async addArtistToFavorites(id: string) {
    const artist: Artist = await this.db.artist.findOne(id);
    if (!artist) throw new UnprocessableEntity("Artist not found");

    await this.db.fav.addArtistToFavorites(artist);
    return createdMessage("Artist");
  }

  async removeArtistFromFavorites(id: string) {
    const artist = await this.db.fav.find(id, "artists");
    if (!artist) throw new UnprocessableEntity("Artist not found");

    await this.db.fav.remove(id, "artists");
    return deletedMessage("Artist");
  }

  async addAlbumToFavorites(id: string) {
    const album: Album = await this.db.album.findOne(id);
    if (!album) throw new UnprocessableEntity("Artist not found");

    await this.db.fav.addAlbumToFavorites(album);
    return createdMessage("Album");
  }

  async removeAlbumFromFavorites(id: string) {
    const album = await this.db.fav.find(id, "albums");
    if (!album) throw new UnprocessableEntity("Album not found");

    await this.db.fav.remove(id, "albums");
    return deletedMessage("Album");
  }
}
