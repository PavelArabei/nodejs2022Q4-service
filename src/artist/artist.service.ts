import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { DbService } from '../db/db.service';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = this.newArtist(createArtistDto);
    return this.db.artist.create(artist);
  }

  findAll(): Artist[] {
    return this.db.artist.findAll();
  }

  findOne(id: string): Artist {
    const artist = this.db.artist.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.db.artist.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');

    const newArtist = this.updateArtist(artist, updateArtistDto);
    return this.db.artist.update(newArtist);
  }

  remove(id: string): void {
    const artist = this.db.artist.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    this.db.artist.remove(id);

    const track = this.db.track.findByAuthorId(id);
    if (track) {
      const updatedTrack: Track = { ...track, artistId: null };
      this.db.track.update(updatedTrack);
    }
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
