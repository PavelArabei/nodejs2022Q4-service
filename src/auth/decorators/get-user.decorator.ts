import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CostumeRequestInterface } from "@app/auth/interfaces/costumeRequest.interface";
import { JwtUserInterface } from "@app/auth/interfaces/jwtUser.interface";

export const GetUser = createParamDecorator((data: keyof JwtUserInterface | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<CostumeRequestInterface>();

  if (!data) return request.user;

  return request.user[data];
});