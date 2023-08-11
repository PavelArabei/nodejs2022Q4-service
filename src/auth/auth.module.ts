import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AtStrategy } from "@app/auth/strategies/at.strategy";
import { RtStrategy } from "@app/auth/strategies/rt.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy]
})
export class AuthModule {
}
