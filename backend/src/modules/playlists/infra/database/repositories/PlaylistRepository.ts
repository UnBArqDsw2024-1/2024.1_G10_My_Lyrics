import { Playlist, Prisma, PrismaClient } from "@prisma/client";
import { IPlaylistRepository } from "../../../repositories/IPlaylistRepository";



export class PlaylistRepository implements IPlaylistRepository {
  private prisma = new PrismaClient();

  async create(playlist: Prisma.PlaylistCreateInput): Promise<Playlist> {
    return this.prisma.playlist.create({ data: playlist });
  }

  async searchByTitle(name: string): Promise<Playlist[]> {
    return this.prisma.playlist.findMany({
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }
}