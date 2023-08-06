import { Album } from "../album/entities/album.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class AlbumDbService {

  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>
  ) {
  }


  public async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  public async findOne(id: string): Promise<Album> {
    return await this.albumRepository.findOneBy({ id });
  }

  public async find(id: string, type: keyof Album): Promise<Album> {
    const album = new Album();
    album[type as string] = id;
    return await this.albumRepository.findOneBy(album);
  }

  public async create(album: Album): Promise<Album> {
    return await this.albumRepository.save(album);
  }

  public async update(album: Album): Promise<Album> {
    return await this.create(album);
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.albumRepository.delete(id);
  }
}
