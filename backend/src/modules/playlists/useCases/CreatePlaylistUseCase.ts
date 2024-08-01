import { Playlist } from "@prisma/client";
import { IPlaylistRepository } from "../repositories/IPlaylistRepository";



interface ICreatePlaylistDTO {
  title: string;
  user_id: string;
}


export class CreatePlaylistUseCase {
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