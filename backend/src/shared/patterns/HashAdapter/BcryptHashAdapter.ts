import { IHashFactory } from "../Factories/IHashFactory";
import { IHash } from "./IHash";
import bcrypt from 'bcrypt';

export class BcryptHashAdapter implements IHash {

    private bcryptClient = bcrypt;
    private saltRounds = 12;

    async hash(value: string): Promise<string> {
        return this.bcryptClient.hash(value, this.saltRounds);
    }

    async compare(value: string, hashed: string): Promise<boolean> {
        return this.bcryptClient.compare(value, hashed);
    }
}

export class BcryptHashFactory implements IHashFactory {
    createHash(): IHash {
        return new BcryptHashAdapter();
    }
}