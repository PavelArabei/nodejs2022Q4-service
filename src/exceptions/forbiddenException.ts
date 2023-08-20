import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(message || "access denied", HttpStatus.FORBIDDEN);
  }
}
