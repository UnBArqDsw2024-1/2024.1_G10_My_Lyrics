import { NotFoundError } from "../../../shared/errors/NotFoundError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../repositories/IArtistRepository";

interface ICreateLikeArtistDTO {
  user_id: string;
  artist_id: string;
}

export class UnlikeArtistUseCase
  implements ICommand<ICreateLikeArtistDTO, void>
{
  constructor(private artistRepository: IArtistRepository) {}

  async execute({ user_id, artist_id }: ICreateLikeArtistDTO): Promise<void> {
    const artist = await this.artistRepository.getById(artist_id);
    if (!artist) {
      throw new NotFoundError("Artist was not found");
    }

    await this.artistRepository.unlikes(user_id, artist_id);
  }
}
