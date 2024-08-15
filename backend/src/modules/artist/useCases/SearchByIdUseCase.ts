import type { Artist } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../repositories/IArtistRepository";

interface IRequest {
  artist_id: string;
}

interface IResponse {
  artist: Artist | null;
}

export class SearchByIdUseCase implements ICommand<IRequest, IResponse> {
  constructor(private artistRepository: IArtistRepository) {}

  async execute({ artist_id }: IRequest): Promise<IResponse> {
    const artist = await this.artistRepository.searchById(artist_id);

    return { artist };
  }
}
