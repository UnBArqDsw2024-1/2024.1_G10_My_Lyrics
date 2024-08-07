import type { Music, Verse } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository";


interface IRequest {
  id: string;
}

type IResponse = (Music & { verses: Verse[]; likes: number }) | null;


export class GetMusicUseCase implements ICommand<IRequest, IResponse> {

  constructor(private musicRepository: IMusicRepository) {}

  public async execute({ id }: IRequest): Promise<(Music & { verses: Verse[]; likes: number }) | null> {
    const music = await this.musicRepository.getById(id);

    if (!music) {
      new Error("Music not found");
      return null;
    }

    const likes = music.likes.length;

    return {
      ...music,
      verses: music.verses,
      likes,
    };
  }

}