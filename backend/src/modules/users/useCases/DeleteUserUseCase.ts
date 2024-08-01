import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  id: string;
}

type IResponse = undefined;

export class DeleteUserUseCase implements ICommand<IRequest, IResponse> {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    await this.userRepository.delete(id);
  }
}
