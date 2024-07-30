import type { User } from "@prisma/client";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
}

type IResponse = User;

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ name, email }: IRequest): Promise<IResponse> {
    const user = this.userRepository.create({
      name,
      email,
    });

    return user;
  }
}
