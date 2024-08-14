import type { Music, Playlist } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IPlaylistRepository } from "../repositories/IPlaylistRepository";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError";

interface IRequest {
  playlist_id: string;
  music_id: string;
  user_id: string;
}

type IResponse = (Playlist & { musics: Music[] }) | null;

export class AddMusicUseCase implements ICommand<IRequest, IResponse> {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async execute({
    playlist_id,
    music_id,
    user_id,
  }: IRequest): Promise<(Playlist & { musics: Music[] }) | null> {

    const playlist = await this.playlistRepository.getById(playlist_id);

    if(!playlist) {
      throw new NotFoundError("playlist not found");
    }

    if(playlist.userId !== user_id) {
      throw new UnauthorizedError("you are not the owner of this playlist");
    }

    const newPlaylist = await this.playlistRepository.addMusic(playlist_id, music_id);

    if (!newPlaylist) {
      throw new BadRequestError("something went wrong");
    }

    return newPlaylist;
  }
}
