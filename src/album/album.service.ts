import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from '../db/db.service';
import { Album } from './entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = this.newAlbum(createAlbumDto);
    return this.db.album.create(album);
  }

  findAll(): Album[] {
    return this.db.album.findAll();
  }

  findOne(id: string): Album {
    const album = this.db.album.findOne(id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.db.album.findOne(id);
    if (!album) throw new NotFoundException('Album not found');

    const newAlbum = this.updateAlbum(album, updateAlbumDto);
    return this.db.album.update(newAlbum);
  }

  remove(id: string): void {
    const album = this.db.album.findOne(id);
    if (!album) throw new NotFoundException('Album not found');
    this.db.album.remove(id);

    const track = this.db.track.find(id, 'albumId');
    if (track) {
      const updatedTrack: Track = { ...track, albumId: null };
      this.db.track.update(updatedTrack);
    }
  }

  private newAlbum(album: CreateAlbumDto): Album {
    const id = v4();
    return {
      id,
      ...album,
    };
  }

  private updateAlbum(album: Album, updateAlbumDto: UpdateAlbumDto): Album {
    return {
      ...album,
      ...updateAlbumDto,
    };
  }
}
