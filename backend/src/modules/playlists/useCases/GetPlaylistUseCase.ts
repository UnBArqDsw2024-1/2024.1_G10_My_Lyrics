import type { Music, Playlist } from "@prisma/client";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface IRequest {
  id: string;
}

type IResponse = (Playlist & { musics: Music[] }) | null;

export class GetPlaylistUseCase implements ICommand<IRequest, IResponse> {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({
    id,
  }: IRequest): Promise<(Playlist & { musics: Music[] }) | null> {
    const playlist = await this.playlistRepository.getById(id);
    if (!playlist) {
      throw new NotFoundError("Playlist not found");
    }

    return playlist;
  }
}
