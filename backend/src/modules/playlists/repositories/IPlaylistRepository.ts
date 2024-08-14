import type { Music, Playlist, Prisma } from "@prisma/client";

export interface IPlaylistRepository {
  create(playlist: Prisma.PlaylistCreateInput): Promise<Playlist>;
  searchByTitle(title: string): Promise<Playlist[]>;
  deleteById(id: string): Promise<void>;
  getById(id: string): Promise<(Playlist & { musics: Music[] }) | null>;
  addMusic(playlistId: string, musicId: string): Promise<(Playlist & { musics: Music[] }) | null>;
}
