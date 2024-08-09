import type { Music, Verse } from "@prisma/client";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository";

interface IRequest {
  id: string;
}

type IResponse = Music & { verses: Verse[]; likes: number };

export class GetMusicUseCase implements ICommand<IRequest, IResponse> {
  constructor(private musicRepository: IMusicRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const music = await this.musicRepository.getById(id);
    if (!music) {
      throw new NotFoundError("Music not found");
    }

    return music;
  }
}
