import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 } from "uuid";

import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { Artist } from "./entities/artist.entity";
import { DbService } from "../db/db.service";

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = this.newArtist(createArtistDto);
    return this.db.artist.create(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.db.artist.findAll();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = this.db.artist.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');

    const newArtist = this.updateArtist(artist, updateArtistDto);
    return this.db.artist.update(newArtist);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    this.db.artist.remove(id);

    for (const key of ['track', 'album']) {
      const el = this.db[key].find(id, 'artistId');
      if (el) {
        const updatedEl = { ...el, artistId: null };
        this.db[key].update(updatedEl);
      }
    }

    const favArtist = this.db.fav.find(id, 'artists');
    if (favArtist) this.db.fav.remove(id, 'artists');
  }

  private newArtist(artist: CreateArtistDto): Artist {
    const id = v4();
    return {
      id,
      ...artist,
    };
  }

  private updateArtist(
    artist: Artist,
    updateArtistDto: UpdateArtistDto,
  ): Artist {
    return {
      ...artist,
      ...updateArtistDto,
    };
  }
}
