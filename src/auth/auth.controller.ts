import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup")
  async signup() {
    return this.authService.signup();

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
