import type { Music } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository";

interface IRequest {
  number: number;
  dataInit: Date;
  dataFinished: Date;
}

type IResponse = Music[];

export class ListTopMusicsUseCase implements ICommand<IRequest, IResponse> {
  constructor(private musicRepository: IMusicRepository) {}

  public async execute({
    number,
    dataInit,
    dataFinished,
  }: IRequest): Promise<IResponse> {
    const musics = await this.musicRepository.countTopMusic(
      number,
      dataInit,
      dataFinished,
    );

    return musics;
  }
}
