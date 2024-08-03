import { env } from "../../../config/env";
import { IJwtFactory } from "../Factories/IJwtFactory";
import { IJwt } from "./IJwt";
import jwt from "jsonwebtoken";

export class JwtAdapter implements IJwt {
    private jwtClient = jwt;
    private secret = env.SECRET;

    sign(payload: any, expiresIn: string): string {
        return this.jwtClient.sign(payload, this.secret, { expiresIn });
    }

    verify(token: string): any {
        return this.jwtClient.verify(token, this.secret);
    }
}

export class JwtFactory implements IJwtFactory {
    createJwt(): IJwt {
        return new JwtAdapter();
    }
}