import type { User } from "@prisma/client";
import type { IUserRepository } from "../repositories/IUserRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

interface IRequest {
  name: string;
}

type IResponse = User;

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ name }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findOneByName(name);

    if (!user) {
      throw new NotFoundError("User was not found!");
    }

    return user;
  }
}
