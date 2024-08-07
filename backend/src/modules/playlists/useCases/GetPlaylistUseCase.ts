import type { Music, Playlist } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface IRequest {
  id: string;
}

export class GetPlaylistUseCase implements ICommand<IRequest, ( Playlist & { musics: Music[] }) | null> {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({ id }: IRequest): Promise<( Playlist & { musics: Music[] }) | null> {
    const playlist = await this.playlistRepository.getById(id);
    if (!playlist) {
      throw new Error("Playlist not found");
    }

    return playlist;
  }
}
