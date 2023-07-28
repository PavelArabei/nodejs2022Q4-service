import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { DbService } from '../db/db.service';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}
  create(createTrackDto: CreateTrackDto) {
    const track = this.newTrack(createTrackDto);
    return this.db.track.create(track);
  }

  findAll(): Track[] {
    return this.db.track.findAll();
  }

  findOne(id: string) {
    const track = this.db.track.findOne(id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.track.findOne(id);
    if (!track) throw new NotFoundException('User not found');

    const newTrack = this.updateTrack(track, updateTrackDto);
    return this.db.track.update(newTrack);
  }

  remove(id: string) {
    const track = this.db.track.findOne(id);
    if (!track) throw new NotFoundException('User not found');

    return this.db.track.remove(id);
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
