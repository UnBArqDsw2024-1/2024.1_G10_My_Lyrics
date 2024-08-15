import type { Artist } from "@prisma/client";

export interface IArtistRepository {
  getById(id: string): Promise<Artist | null>;
  likes(user_id: string, artist_id: string): Promise<void>;
  unlikes(user_id: string, artist_id: string): Promise<void>;
  searchByName(name: string): Promise<Artist[]>;
  searchById(artist_id: string, user_id?: string): Promise<Artist | null>;
}
