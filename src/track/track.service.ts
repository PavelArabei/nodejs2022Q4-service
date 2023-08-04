import { Injectable, NotFoundException } from "@nestjs/common";

import { v4 } from "uuid";
import { CreateTrackDto } from "./dto/create-track.dto";
import { DbService } from "../db/db.service";
import { Track } from "./entities/track.entity";
import { UpdateTrackDto } from "./dto/update-track.dto";

@Injectable()
export class TrackService {
  constructor(private db: DbService) {
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.newTrack(createTrackDto);
    return this.db.track.create(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.db.track.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.db.track.findOne(id);
    if (!track) throw new NotFoundException("Track not found");
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);

    const newTrack = this.updateTrack(track, updateTrackDto);
    return await this.db.track.update(newTrack);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.db.track.remove(id);

    const favTrack = await this.db.fav.find(id, "tracks");
    if (favTrack) await this.db.fav.remove(id, "tracks");
  }

  private newTrack(track: CreateTrackDto): Track {
    const id = v4();
    return {
      artistId: null,
      albumId: null,
      id,
      ...track
    };
  }

  private updateTrack(track: Track, updateTrackDto: UpdateTrackDto): Track {
    return {
      ...track,
      ...updateTrackDto
    };
  }
}
