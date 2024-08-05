import type { Playlist, Prisma, PrismaClient } from "@prisma/client";
import { DatabaseConnection } from "../../../../../infra/database/GetConnection";
import type { IPlaylistRepository } from "../../../repositories/IPlaylistRepository";

export class PlaylistRepository implements IPlaylistRepository {
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = DatabaseConnection.getInstance();
  }

  private static INSTANCE: PlaylistRepository | null;
  public static getInstance() {
    if (!PlaylistRepository.INSTANCE) {
      PlaylistRepository.INSTANCE = new PlaylistRepository();
    }

    return PlaylistRepository.INSTANCE;
  }

  async create(playlist: Prisma.PlaylistCreateInput): Promise<Playlist> {
    return this.prismaClient.playlist.create({ data: playlist });
  }

  async searchByTitle(name: string): Promise<Playlist[]> {
    return this.prismaClient.playlist.findMany({
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaClient.playlist.delete({
      where: {
        id,
      },
    });
  }
}
