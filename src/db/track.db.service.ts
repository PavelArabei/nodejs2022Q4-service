import { Injectable } from '@nestjs/common';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class TrackDBService {
  private TRACKS: Track[] = [];

  public findAll(): Track[] {
    return this.TRACKS;
  }
  public findOne(id: string): Track {
    return this.TRACKS.find((track) => track.id === id);
  }
  public findByAuthorId(id: string): Track | undefined {
    return this.TRACKS.find((track) => track.artistId === id);
  }
  public create(track: Track): Track {
    this.TRACKS.push(track);
    return track;
  }
  public update(track: Track): Track {
    const UpdatedTrack: Track = this.TRACKS.find(
      (el: Track) => el.id === track.id,
    );

    for (const updatedTrackKey in track) {
      UpdatedTrack[updatedTrackKey] = track[updatedTrackKey];
    }
    return UpdatedTrack;
  }
  public remove(id: string): void {
    this.TRACKS = this.TRACKS.filter((track) => track.id !== id);
  }
}
