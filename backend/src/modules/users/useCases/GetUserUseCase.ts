import type { User } from "@prisma/client";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  name: string;
}

type IResponse = User;

export class GetUserUseCase implements ICommand<IRequest, IResponse> {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ name }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findOneByName(name);

    if (!user) {
      throw new NotFoundError("User was not found!");
    }

    return user;
  }
}
