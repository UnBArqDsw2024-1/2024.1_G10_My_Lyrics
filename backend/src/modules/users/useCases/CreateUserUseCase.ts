import type { User } from "@prisma/client";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IHash } from "../../../shared/patterns/HashAdapter/IHash";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

type IResponse = User;

export class CreateUserUseCase implements ICommand<IRequest, IResponse> {
  constructor(private userRepository: IUserRepository, private hash: IHash) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new BadRequestError("User already exists!!!!!!!!!");
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: await this.hash.hash(password),
    });

    // @ts-ignore
    user.password = undefined;

    return user;
  }
}
