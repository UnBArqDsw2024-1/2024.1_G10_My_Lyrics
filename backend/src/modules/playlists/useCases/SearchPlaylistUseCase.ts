import type { Playlist } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface ISearchPlaylistDTO {
  title: string;
}

export class SearchPlaylistUseCase
  implements ICommand<ISearchPlaylistDTO, Playlist[]>
{
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({ title }: ISearchPlaylistDTO): Promise<Playlist[]> {
    return this.playlistRepository.searchByTitle(title);
  }
}
