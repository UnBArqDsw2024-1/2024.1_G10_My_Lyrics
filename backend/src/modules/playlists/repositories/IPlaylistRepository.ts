import type { Playlist, Prisma } from "@prisma/client";

export interface IPlaylistRepository {
  create(playlist: Prisma.PlaylistCreateInput): Promise<Playlist>;
  searchByTitle(title: string): Promise<Playlist[]>;
  deleteById(id: string): Promise<void>;
}
