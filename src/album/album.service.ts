import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { DbService } from "../db/db.service";
import { Album } from "./entities/album.entity";
import { Track } from "../track/entities/track.entity";
import { v4 } from "uuid";

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const album: Album = this.newAlbum(createAlbumDto);
    return await this.db.album.create(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.db.album.findAll();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.db.album.findOne(id);
    if (!album) throw new NotFoundException("Album not found");
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    const newAlbum = this.updateAlbum(album, updateAlbumDto);
    return await this.db.album.update(newAlbum);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.db.album.remove(id);

    const track = await this.db.track.find(id, "albumId");
    if (track) {
      const updatedTrack: Track = { ...track, albumId: null };
      await this.db.track.update(updatedTrack);
    }

    // const favAlbum = await this.db.fav.find(id, "albums");
    // if (favAlbum) await this.db.fav.remove(id, "albums");
  }

  private newAlbum(album: CreateAlbumDto): Album {
    const id = v4();
    return {
      id,
      ...album
    };
  }

  private updateAlbum(album: Album, updateAlbumDto: UpdateAlbumDto): Album {
    return {
      ...album,
      ...updateAlbumDto
    };
  }
}
