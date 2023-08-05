import { Injectable } from "@nestjs/common";
import { Track } from "../track/entities/track.entity";
import { Artist } from "../artist/entities/artist.entity";
import { Album } from "../album/entities/album.entity";
import { Favs } from "../fav/entities/favs.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FavArtistEntity } from "../fav/entities/favArtist.entity";
import { FavAlbumEntity } from "../fav/entities/favAlbum.entity";
import { FavTrackEntity } from "../fav/entities/favTrack.entity";

@Injectable()
export class FavDBService {
  constructor(
    @InjectRepository(FavArtistEntity)
    private readonly favArtist: Repository<FavArtistEntity>,
    @InjectRepository(FavAlbumEntity)
    private readonly favAlbum: Repository<FavAlbumEntity>,
    @InjectRepository(FavTrackEntity)
    private readonly favTrack: Repository<FavTrackEntity>
  ) {
  }

  async findAll() {
    const artist = await this.favArtist.find({ relations: ["artist"] });
    const album = await this.favAlbum.find({ relations: ["album"] });
    const track = await this.favTrack.find({ relations: ["track"] });
    const [artists, albums, tracks] = [artist, album, track].map(el => this.clearId(el));
    return { artists, tracks, albums };
  }

  async addTrackToFavorites(track: Track) {
    const favTrack = await this.favTrack.create({ id: track.id, track });
    return await this.favTrack.save(favTrack);

  }

  async addAlbumToFavorites(album: Album) {
    const favAlbum = await this.favAlbum.create({ id: album.id, album });
    return await this.favAlbum.save(favAlbum);

  }

  async addArtistToFavorites(artist: Artist) {
    const favArtist = await this.favArtist.create({ id: artist.id, artist });
    return await this.favArtist.save(favArtist);
  }

  async find(id: string, type: keyof Favs) {
    if (type === "artists")
      return await this.favArtist.findOneBy({ id });
    if (type === "tracks")
      return await this.favTrack.findOneBy({ id });
    if (type === "albums")
      return await this.favAlbum.findOneBy({ id });
  }

  async remove(id: string, type: keyof Favs) {
    if (type === "artists") await this.favArtist.delete(id);
    if (type === "tracks") await this.favTrack.delete(id);
    if (type === "albums") await this.favAlbum.delete(id);
  }

  clearId(array: FavArtistEntity[] | FavAlbumEntity[] | FavTrackEntity[]) {
    return array.map(el => {
      const { id, ...other } = el;
      for (const otherKey in other) {
        if (otherKey === "artist" || otherKey === "album" || otherKey === "track") {
          return other[otherKey];
        }
      }
    });

  }
}
