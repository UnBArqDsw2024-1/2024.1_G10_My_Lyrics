import type {
  Artist,
  Music,
  Prisma,
  PrismaClient,
  Verse,
} from "@prisma/client";
import { DatabaseConnection } from "../../../../../infra/database/GetConnection";
import type { IMusicRepository } from "../../../repositories/IMusicRepository";

export class MusicRepository implements IMusicRepository {
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = DatabaseConnection.getInstance();
  }

  private static INSTANCE: MusicRepository | null;
  public static getInstance() {
    if (!MusicRepository.INSTANCE) {
      MusicRepository.INSTANCE = new MusicRepository();
    }

    return MusicRepository.INSTANCE;
  }

  public async create(music: Prisma.MusicCreateInput): Promise<Music> {
    return this.prismaClient.music.create({ data: music });
  }

  public async getById(
    id: string,
  ): Promise<(Music & { verses: Verse[]; likes: number }) | null> {
    const music = await this.prismaClient.music.findUnique({
      where: { id },
      include: {
        verses: true,
        _count: {
          select: { likes: true },
        },
      },
    });
    if (!music) {
      return null;
    }

    const {
      _count: { likes },
      ...remaining
    } = music;
    return {
      ...remaining,
      likes,
    };
  }

  public async searchByTitle(name: string): Promise<Music[]> {
    return this.prismaClient.music.findMany({
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  public async countTopMusic(
    number: number,
    dataInit: Date,
    dataFinished: Date,
  ): Promise<(Music & { count: bigint; artists: Artist[] })[]> {
    const musics: (Music & { count: bigint; artists: Artist[] })[] = await this
      .prismaClient.$queryRaw`
      SELECT 
        COUNT(*) as count, 
        M.*, 
        ARRAY_AGG(A.*) as artists 
      FROM "MusicAccess" MA
      INNER JOIN "Music" M ON M.id = MA."musicId"
      INNER JOIN "Album" ALB ON M."albumId" = ALB.id
      INNER JOIN "Artist" A ON A.id = ANY(
        SELECT AA."artistId" 
        FROM "_AlbumArtists" AA 
        WHERE AA."albumId" = ALB.id
      )
      WHERE MA."date" BETWEEN ${dataInit} AND ${dataFinished}
      GROUP BY M.id, ALB.id
      ORDER BY COUNT(*) DESC
      LIMIT ${number}`;

    if (musics.length < number) {
      const alreadyFetched = musics.map((e) => e.id);
      const missingNumber = number - musics.length;

      const toAdd = await this.prismaClient.music.findMany({
        where: {
          id: { notIn: alreadyFetched },
        },
        include: {
          album: {
            include: {
              artists: true,
            },
          },
        },
        take: missingNumber,
      });
      return musics.concat(
        toAdd.map((e) => ({
          ...e,
          count: BigInt(0),
          artists: e.album.artists,
        })),
      );
    }

    return musics;
  }

  public async likes(user_id: string, music_id: string): Promise<void> {
    await this.prismaClient.music.update({
      where: {
        id: music_id,
      },
      data: {
        likes: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }

  public async unlikes(user_id: string, music_id: string): Promise<void> {
    await this.prismaClient.music.update({
      where: {
        id: music_id,
      },
      data: {
        likes: {
          disconnect: {
            id: user_id,
          },
        },
      },
    });
  }
}
