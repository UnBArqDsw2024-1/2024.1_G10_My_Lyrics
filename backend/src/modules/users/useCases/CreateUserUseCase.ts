import type { User } from "@prisma/client";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

type IResponse = User;

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({
    name,
    email,
    password,
    confirmedPassword,
  }: IRequest): Promise<IResponse> {
    if (password !== confirmedPassword) {
      throw new BadRequestError(
        "Password and confirming password is not matching",
      );
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
    });

    // @ts-ignore
    user.password = undefined;

    return user;
  }
}
