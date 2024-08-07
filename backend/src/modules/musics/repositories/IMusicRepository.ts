import type { Music, Prisma } from "@prisma/client";

export interface IMusicRepository {
  create(music: Prisma.MusicCreateInput): Promise<Music>;
  countTopMusic(
    number: number,
    dataInit: Date,
    dataFinished: Date,
  ): Promise<Music[]>;
}
