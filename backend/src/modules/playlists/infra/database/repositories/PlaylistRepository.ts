import type { Music, Playlist, Prisma, PrismaClient } from "@prisma/client";
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
    return await this.prismaClient.playlist.create({ data: playlist });
  }

  async searchByTitle(name: string): Promise<Playlist[] | null> {
    const playlists = await this.prismaClient.playlist.findMany({
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!playlists) {
      return null;
    }

    const formattedPlaylists = playlists.map((playlist) => {
      const {
        _count: { likes },
        ...remaining
      } = playlist;

      return { ...remaining, likes };
    });

    return formattedPlaylists;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaClient.playlist.delete({
      where: {
        id,
      },
    });
  }

  async getById(
    id: string,
  ): Promise<(Playlist & { musics: Music[]; likes: number }) | null> {
    const playlist = await this.prismaClient.playlist.findUnique({
      where: {
        id,
      },
      include: {
        musics: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!playlist) {
      return null;
    }

    const {
      _count: { likes },
      ...remaining
    } = playlist;

    return { ...remaining, likes };
  }

  async addMusic(
    playlistId: string,
    musicId: string,
  ): Promise<(Playlist & { musics: Music[]; likes: number }) | null> {
    const playlist = await this.prismaClient.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        musics: {
          connect: {
            id: musicId,
          },
        },
      },
      include: {
        musics: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!playlist) {
      return null;
    }

    const {
      _count: { likes },
      ...remaining
    } = playlist;

    return { ...remaining, likes };
  }

  async likePlaylist(playlistId: string, user_Id: string): Promise<void> {
    await this.prismaClient.playlist.update({
      where: { id: playlistId },
      data: {
        likes: {
          connect: { id: user_Id },
        },
      },
    });
  }
}
