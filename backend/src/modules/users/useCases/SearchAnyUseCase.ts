import type { Artist, Music } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../../artist/repositories/IArtistRepository";
import type { IMusicRepository } from "../../musics/repositories/IMusicRepository";

interface IRequest {
  text: string;
}

interface IResponse {
  artists: Artist[];
  musics: Music[];
}

export class SearchAnyUseCase implements ICommand<IRequest, IResponse> {
  constructor(
    private artistRepository: IArtistRepository,
    private musicRepository: IMusicRepository,
  ) {}

  public async execute({ text }: IRequest): Promise<IResponse> {
    const artists = await this.artistRepository.searchByName(text);
    const musics = await this.musicRepository.searchByTitle(text);

    return {
      artists,
      musics,
    };
  }
}
