import { Injectable } from "@nestjs/common";
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


  async signup(dto: CreateUserDto) {
    // const previousUser = await this.db.user.findOneByDto(dto);
    //  if (previousUser) throw new HttpException("Username Taken", HttpStatus.CONFLICT);

    const user = await this.db.user.create(dto);

    const tokens = await this.getToken(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return user;
  }


  async login(dto: CreateUserDto): Promise<Tokens> {
    const user = await this.db.user.findOneByDto(dto);
    if (!user) throw new ForbiddenException();

    const isPasswordEqual = await compare(dto.password, user.password);
    if (!isPasswordEqual) throw new ForbiddenException();

    const tokens = await this.getToken(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
    //
  }


  async refreshToken(userId: string, rt: string) {
    const user = await this.db.user.findOne(userId);
    if (!user || !user.hashedRt) throw new ForbiddenException();

    const isRtEqual = await compare(rt, user.hashedRt);
    if (!isRtEqual) throw new ForbiddenException();

    const tokens = await this.getToken(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
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
    const { JWT_SECRET_KEY, JWT_SECRET_REFRESH_KEY, TOKEN_REFRESH_EXPIRE_TIME, TOKEN_EXPIRE_TIME } = process.env;
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        login
      }, {
        secret: JWT_SECRET_KEY,
        expiresIn: +TOKEN_EXPIRE_TIME
      }),
      this.jwtService.signAsync({
        sub: userId,
        login
      }, {
        secret: JWT_SECRET_REFRESH_KEY,
        expiresIn: +TOKEN_REFRESH_EXPIRE_TIME
      })

    ]);
    return {
      accessToken: at,
      refreshToken: rt
    };

  }
}
