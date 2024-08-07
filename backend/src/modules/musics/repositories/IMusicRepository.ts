import type { Music, Prisma, User, Verse } from "@prisma/client";

export interface IMusicRepository {
  create(music: Prisma.MusicCreateInput): Promise<Music>;
  getById(
    id: string,
  ): Promise<(Music & { verses: Verse[]; likes: User[] }) | null>;
  searchByTitle(title: string): Promise<Music[]>;
  countTopMusic(
    number: number,
    dataInit: Date,
    dataFinished: Date,
  ): Promise<(Music & { count: BigInt })[]>;
}
