import type { Music, Prisma } from "@prisma/client";

export interface IMusicRepository {
  create(music: Prisma.MusicCreateInput): Promise<Music>;
}
