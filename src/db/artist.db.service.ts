import { Injectable } from "@nestjs/common";
import { Artist } from "../artist/entities/artist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ArtistDbService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>) {
  }

  public async findAll() {
    return await this.artistRepository.find();
  }

  public async findOne(id: string) {
    return await this.artistRepository.findOneBy({ id });
  }

  public async create(artist: Artist) {
    return await this.artistRepository.save(artist);
  }

  public async update(artist: Artist) {
    return await this.create(artist);
  }

  public async remove(id: string) {
    return await this.artistRepository.delete(id);
  }
}
