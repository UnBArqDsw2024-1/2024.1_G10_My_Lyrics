import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { IAuth } from "../patterns/AuthAdapter/IAuth";
import { AuthFactory } from "../patterns/AuthAdapter/JwtAuthAdapter";

interface IDecoded {
  userId: string;
}

export class VerifyJwt {
  private auth: IAuth;
  private required: boolean;

  constructor(required = true) {
    this.auth = new AuthFactory().createAuth();
    this.required = required;
  }

  verify(request: Request, _: Response, next: NextFunction) {
    const authorization =
      request.headers.authorization ??
      (request.cookies["CU-QUE-FODAO"] &&
        `Bearer ${request.cookies["CU-QUE-FODAO"]}`);

    if (!authorization) {
      if (this.required) {
        throw new UnauthorizedError("Unauthorized");
      }

      next();
      return;
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
