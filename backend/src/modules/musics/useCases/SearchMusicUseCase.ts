import type { Music } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository";

interface ISearchMusicDTO {
  title: string;
}

export class SearchMusicUseCase implements ICommand<ISearchMusicDTO, Music[]> {
  constructor(private musicRepository: IMusicRepository) {}

  async execute({ title }: ISearchMusicDTO): Promise<Music[]> {
    return this.musicRepository.searchByTitle(title);
  }
}
