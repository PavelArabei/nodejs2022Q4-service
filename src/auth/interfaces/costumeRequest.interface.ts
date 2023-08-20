import { Request } from "express";
import { JwtUserInterface } from "@app/auth/interfaces/jwtUser.interface";

export interface CostumeRequestInterface extends Request {
  user: JwtUserInterface;
}