import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";

interface IRequest {
  id: string;
}

export class DeletePlaylistUseCase implements ICommand<IRequest, void> {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    await this.playlistRepository.deleteById(id);
  }
}
