import type { IHash } from "../HashAdapter/IHash";

export interface IHashFactory {
  createHash(): IHash;
}
