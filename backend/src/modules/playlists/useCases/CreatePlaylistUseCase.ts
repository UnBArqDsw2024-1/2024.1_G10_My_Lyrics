import type { Playlist } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface ICreatePlaylistDTO {
  title: string;
  user_id: string;
}

export class CreatePlaylistUseCase
  implements ICommand<ICreatePlaylistDTO, Playlist>
{
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({ title, user_id }: ICreatePlaylistDTO): Promise<Playlist> {
    const playlist = await this.playlistRepository.create({
      title,
      onwer: {
        connect: {
          id: user_id,
        },
      },
    });

    return playlist;
  }
}
