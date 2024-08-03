import type { IHash } from "../HashAdapter/IHash";
import { IJwt } from "../JwtAdapter/IJwt";

export interface IJwtFactory {
  createJwt(): IJwt;
}
