import { Injectable, NotFoundException } from "@nestjs/common";

import { v4 } from "uuid";
import { CreateTrackDto } from "./dto/create-track.dto";
import { DbService } from "../db/db.service";
import { Track } from "./entities/track.entity";
import { UpdateTrackDto } from "./dto/update-track.dto";

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto): Track {
    const track = this.newTrack(createTrackDto);
    return this.db.track.create(track);
  }

  findAll(): Track[] {
    return this.db.track.findAll();
  }

  findOne(id: string): Track {
    const track = this.db.track.findOne(id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.db.track.findOne(id);
    if (!track) throw new NotFoundException('Track not found');

    const newTrack = this.updateTrack(track, updateTrackDto);
    return this.db.track.update(newTrack);
  }

  remove(id: string): void {
    const track = this.db.track.findOne(id);
    if (!track) throw new NotFoundException('Track not found');
    this.db.track.remove(id);

    const favTrack = this.db.fav.find(id, 'tracks');
    if (favTrack) this.db.fav.remove(id, 'tracks');
  }

  private newTrack(track: CreateTrackDto): Track {
    const id = v4();
    return {
      id,
      ...track,
    };
  }

  private updateTrack(track: Track, updateTrackDto: UpdateTrackDto): Track {
    return {
      ...track,
      ...updateTrackDto,
    };
  }
}
