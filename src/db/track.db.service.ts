import { Injectable } from "@nestjs/common";
import { Track } from "../track/entities/track.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TrackDBService {

  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>) {
  }

  public async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  public async findOne(id: string): Promise<Track> {
    return await this.trackRepository.findOneBy({ id });
  }

  public async find(id: string, type: keyof Track): Promise<Track> {
    const track = new Track();
    track[type as string] = id;
    return await this.trackRepository.findOneBy(track);
  }

  public async create(track: Track): Promise<Track> {
    return await this.trackRepository.save(track);
  }

  public async update(track: Track): Promise<Track> {
    return await this.trackRepository.save(track);
  }

  public async remove(id: string): Promise<void> {
    await this.trackRepository.delete(id);
  }
}
