import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RemovePasswordInterceptor } from "../interseptors/remove-password/remove-password.interceptor";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor
    }]
})
export class UserModule {
}
