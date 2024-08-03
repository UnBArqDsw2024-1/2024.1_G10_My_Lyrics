import type { Music } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository";

interface IRequest {
  albumId: string;
  title: string;
  youtubeUrl: string;
  iconUrl: string;
  verses: {
    text: string;
    startTime: number;
    endTime: number;
    translatedText?: string;
  }[];
}

type IResponse = Music;

export class CreateMusicUseCase implements ICommand<IRequest, IResponse> {
  constructor(private musicRepository: IMusicRepository) {}

  public async execute({
    albumId,
    iconUrl,
    title,
    youtubeUrl,
    verses,
  }: IRequest): Promise<Music> {
    const music = await this.musicRepository.create({
      iconUrl,
      album: { connect: { id: albumId } },
      title,
      youtubeUrl,
      verses: { createMany: { data: verses } },
    });

    return music;
  }
}
