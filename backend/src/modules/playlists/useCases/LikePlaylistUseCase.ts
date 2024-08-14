import { NotFoundError } from "../../../shared/errors/NotFoundError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IUserRepository } from "../../users/repositories/IUserRepository";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface ILikePlaylistDTO {
  playlistId: string;
  user_id: string;
}

export class LikePlaylistUseCase implements ICommand<ILikePlaylistDTO, void> {
  constructor(
    private playlistRepository: IPlaylistRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ playlistId, user_id }: ILikePlaylistDTO): Promise<void> {
    const user = await this.userRepository.findOneById(user_id);
    if (!user) {
      throw new NotFoundError("User was not found");
    }

    await this.playlistRepository.likePlaylist(playlistId, user_id);
  }
}
