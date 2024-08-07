import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { IAuth } from "../patterns/AuthAdapter/IAuth";
import { AuthFactory } from "../patterns/AuthAdapter/JwtAuthAdapter";

interface IDecoded {
  userId: string;
}

export class VerifyJwt {
  private auth: IAuth;

  constructor() {
    this.auth = new AuthFactory().createAuth();
  }

  verify(request: Request, _: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError("Unauthorized");
    }

    const token = authorization.split(" ")[1]; // Bearer <token>

    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    try {
      const decoded = this.auth.verify(token) as IDecoded;

      if (!decoded || typeof decoded !== "object" || !decoded.userId) {
        throw new UnauthorizedError("Unauthorized");
      }

      // @ts-ignore
      request.user = decoded.userId;

      next();
    } catch {
      throw new UnauthorizedError("Unauthorized");
    }
  }
}
