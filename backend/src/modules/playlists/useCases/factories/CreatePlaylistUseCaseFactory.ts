import { PlaylistRepository } from "../../infra/database/repositories/PlaylistRepository";
import { CreatePlaylistUseCase } from "../CreatePlaylistUseCase";

export function createPlaylistUseCaseFactory(): CreatePlaylistUseCase {
  const playlistRepository = new PlaylistRepository();

  return new CreatePlaylistUseCase(playlistRepository);
}
