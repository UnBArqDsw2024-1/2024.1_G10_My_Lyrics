import { unlinkSync } from "node:fs";
import path from "node:path";
import type { User } from "@prisma/client";
import { multerConfig } from "../../../config/multerConfig";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  user_id: string;
  filepath: string;
}

type IResponse = User;

export class UpdateUserIconUseCase implements ICommand<IRequest, IResponse> {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ filepath, user_id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findOneById(user_id);
    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (user.iconUrl) {
      const originalName = user.iconUrl.split("/user/avatar/")[1];
      try {
        unlinkSync(
          path.join(multerConfig.storagePath, decodeURI(originalName)),
        );
      } catch {
        //
      }
    }

    user.iconUrl = filepath;
    await this.userRepository.update(user);

    return user;
  }
}
