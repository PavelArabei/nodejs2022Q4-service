import { Injectable } from "@nestjs/common";
import { DbService } from "@app/db/db.service";
import { CreateUserDto } from "@app/user/dto/create-user.dto";


@Injectable()
export class AuthService {

  constructor(private db: DbService) {
  }

  async signup(dto: CreateUserDto) {
    return this.db.user.create(dto);
  }


  async login() {
    //
  }


  async refreshToken() {
    //
  }


  async logout() {
    //
  }
}
