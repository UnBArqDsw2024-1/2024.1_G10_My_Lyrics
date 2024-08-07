import type { User } from "@prisma/client";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  id: string;
  name: string | undefined;
  email: string | undefined;
  censoredMusics: boolean | undefined;
}

type IResponse = User;

export class UpdateUserUseCase implements ICommand<IRequest, IResponse> {
  constructor(private userRepository: IUserRepository
  ) { }

  public async execute({ id, name, email, censoredMusics }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (censoredMusics !== undefined) {
      user.censoredMusics = censoredMusics;
    }

    await this.userRepository.update(user);

    return user;
  }
}
