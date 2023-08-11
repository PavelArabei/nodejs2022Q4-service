import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "@app/user/dto/create-user.dto";
import { Tokens } from "@app/auth/types/tokens.type";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup")
  async signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post("login")
  async login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post("refresh")
  async refreshToken() {
    return this.authService.refreshToken();
  }

  @Post("logout")
  async logout() {
    return this.authService.logout();
  }


}
