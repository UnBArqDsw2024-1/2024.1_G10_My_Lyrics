import type { User } from "@prisma/client";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { IAuth } from "../../../shared/patterns/AuthAdapter/IAuth";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IHash } from "../../../shared/patterns/HashAdapter/IHash";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

type IResponse = {
  user: User;
  auth: string;
};

export class AuthenticateUserUseCase implements ICommand<IRequest, IResponse> {
  constructor(
    private userRepository: IUserRepository,
    private hash: IHash,
    private auth: IAuth,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Email or password is incorrect");
    }

    const isPasswordCorrect = await this.hash.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestError("Email or password is incorrect");
    }

    const auth = this.auth.sign({ userId: user.id }, "30d");

    // @ts-ignore
    user.password = undefined;

    return { user, auth };
  }
}
