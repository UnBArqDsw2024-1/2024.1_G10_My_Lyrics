import type { User } from "@prisma/client";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IHash } from "../../../shared/patterns/HashAdapter/IHash";
import type { IUserRepository } from "../repositories/IUserRepository";
import { IJwt } from "../../../shared/patterns/JwtAdapter/IJwt";

interface IRequest {
  email: string;
  password: string;
}

type IResponse = {
  user: User;
  jwt: string;
}

export class AuthenticateUserUseCase implements ICommand<IRequest, IResponse> {
  constructor(private userRepository: IUserRepository, private hash: IHash, private jwt: IJwt) { }

  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Email or password is incorrect");
    }

    const isPasswordCorrect = await this.hash.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestError("Email or password is incorrect");
    }

    const jwt = this.jwt.sign({ userId: user.id }, "30d");

    // @ts-ignore
    user.password = undefined;

    return { user, jwt };
  }
}
