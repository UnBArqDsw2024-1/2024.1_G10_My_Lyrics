import type { Artist, Music, Prisma, Verse } from "@prisma/client";

export interface IMusicRepository {
  create(music: Prisma.MusicCreateInput): Promise<Music>;
  getById(
    id: string,
    user_id?: string,
  ): Promise<(Music & { verses: Verse[]; likes: number }) | null>;
  searchByTitle(title: string): Promise<Music[]>;
  countTopMusic(
    number: number,
    dataInit: Date,
    dataFinished: Date,
  ): Promise<(Music & { count: bigint; artists: Artist[] })[]>;
  likes(user_id: string, music_id: string): Promise<void>;
  unlikes(user_id: string, music_id: string): Promise<void>;
  searchByArtist(artistId: string): Promise<Music[]>;
}
