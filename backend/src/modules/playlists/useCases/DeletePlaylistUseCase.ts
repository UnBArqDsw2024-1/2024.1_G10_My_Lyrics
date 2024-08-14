import { NotFoundError } from "../../../shared/errors/NotFoundError";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface IRequest {
  id: string;
  userId: string;
}

export class DeletePlaylistUseCase implements ICommand<IRequest, void> {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({ id, userId }: IRequest): Promise<void> {
    const playlist = await this.playlistRepository.getById(id);
    if (!playlist || playlist.userId !== userId) {
      throw new NotFoundError("Playlist was not found");
    }

    await this.playlistRepository.deleteById(id);
  }
}
