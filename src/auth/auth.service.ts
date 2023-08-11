import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DbService } from "@app/db/db.service";
import { CreateUserDto } from "@app/user/dto/create-user.dto";
import { Tokens } from "@app/auth/types/tokens.type";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";
import { compare, hash } from "bcrypt";
import { ForbiddenException } from "@app/exceptions/forbiddenException";


@Injectable()
export class AuthService {

  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService) {
  }


  async signup(dto: CreateUserDto): Promise<Tokens> {
    const previousUser = await this.db.user.findOneByDto(dto);
    if (previousUser) throw new HttpException("Username Taken", HttpStatus.CONFLICT);

    const user = await this.db.user.create(dto);
    const tokens = await this.getToken(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }


  async login(dto: CreateUserDto): Promise<Tokens> {
    const user = await this.db.user.findOneByDto(dto);
    if (!user) throw new ForbiddenException();

    const isPasswordEqual = await compare(dto.password, user.password);
    if (!isPasswordEqual) throw new ForbiddenException();

    const tokens = await this.getToken(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
    //
  }


  async refreshToken(userId: string, rt: string) {
    const user = await this.db.user.findOne(userId);
    if (!user) throw new ForbiddenException();
    if (!user.hashedRt) throw new ForbiddenException();

    const isRtEqual = await compare(rt, user.hashedRt);
    if (!isRtEqual) throw new ForbiddenException();

    const tokens = await this.getToken(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }


  async logout(userId: string) {
    const user = await this.db.user.findOne(userId);
    user.hashedRt = null;
    await this.db.user.save(user);
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const hashedRt = await this.hashData(refreshToken);
    const user = await this.db.user.findOne(userId);
    user.hashedRt = hashedRt;
    await this.db.user.save(user);
  }

  async hashData(data: string): Promise<string> {
    const { CRYPT_SALT } = process.env;
    return hash(data, +CRYPT_SALT);
  }

  async getToken(userId: string, login: string): Promise<Tokens> {
    const { JWT_SECRET_KEY, JWT_SECRET_REFRESH_KEY } = process.env;
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        login
      }, {
        secret: JWT_SECRET_KEY,
        expiresIn: 60 * 15
      }),
      this.jwtService.signAsync({
        sub: userId,
        login
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
}
