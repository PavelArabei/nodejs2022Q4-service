import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "@app/user/dto/create-user.dto";
import { Tokens } from "@app/auth/types/tokens.type";
import { AtGuard } from "@app/auth/guards/at.guard";
import { RtGuard } from "@app/auth/guards/rt.guard";
import { GetUser } from "@app/auth/decorators/get-user.decorator";
import { JwtUserInterface } from "@app/auth/interfaces/jwtUser.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup")
  async signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @UseGuards(AtGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser("sub") id: string): Promise<void> {
    return this.authService.logout(id);
  }

  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetUser() {
      sub: id,
      refreshToken
    }: JwtUserInterface,
    @Body("refreshToken") refreshToken2: string): Promise<Tokens> {
    return this.authService.refreshToken(id, refreshToken);
  }

}
