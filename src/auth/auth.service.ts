import { Injectable } from "@nestjs/common";
import { DbService } from "@app/db/db.service";
import { CreateUserDto } from "@app/user/dto/create-user.dto";
import { Tokens } from "@app/auth/types/tokens.type";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";


@Injectable()
export class AuthService {

  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService) {
  }

  async getToken(userId: string, email: string): Promise<Tokens> {
    const { JWT_SECRET_KEY, JWT_SECRET_REFRESH_KEY } = process.env;
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {
        secret: JWT_SECRET_KEY,
        expiresIn: 60 * 15
      }),
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {
        secret: JWT_SECRET_REFRESH_KEY,
        expiresIn: 60 * 60 * 24 * 7
      })

    ]);
    return {
      access_token: at,
      refresh_token: rt
    };

  }

  async signup(dto: CreateUserDto): Promise<Tokens> {
    return await this.db.user.create(dto) as any;
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
