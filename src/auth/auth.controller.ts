import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "@app/user/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup")
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);

  }

  @Post("login")
  async login() {
    return this.authService.login();
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
