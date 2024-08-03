import type { IAuth } from "../AuthAdapter/IAuth";

export interface IAuthFactory {
  createAuth(): IAuth;
}
