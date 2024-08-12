import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface ILikePlaylistDTO {
  playlistId: string;
  user_Id: string;
}

export class LikePlaylistUseCase implements ICommand<ILikePlaylistDTO, void> {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({ playlistId, user_Id }: ILikePlaylistDTO): Promise<void> {
    await this.playlistRepository.likePlaylist(playlistId, user_Id);
  }
}
