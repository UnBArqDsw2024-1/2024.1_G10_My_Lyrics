import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import type { IAuthFactory } from "../Factories/IJwtFactory";
import type { IAuth } from "./IAuth";

export class JwtAuthAdapter implements IAuth {
  private jwtClient = jwt;
  private secret = env.SECRET;
  private i = 1;

  sign(payload: string | object | Buffer, expiresIn: string): string {
    return this.jwtClient.sign(payload, this.secret, { expiresIn });
  }

  verify(token: string): string | object | Buffer {
    return this.jwtClient.verify(token, this.secret);
  }
}

export class AuthFactory implements IAuthFactory {
  createAuth(): IAuth {
    return new JwtAuthAdapter();
  }
}
