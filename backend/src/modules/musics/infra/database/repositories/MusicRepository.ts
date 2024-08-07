import type { Music, Prisma, PrismaClient, Verse } from "@prisma/client";
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
  ): Promise<(Music & { count: bigint })[]> {
    return this.prismaClient.$queryRaw`
      SELECT COUNT(*), M.* FROM "MusicAccess" MA 
      INNER JOIN "Music" M ON M.id = MA."musicId"
      WHERE MA."date" BETWEEN ${dataInit} AND ${dataFinished}
      GROUP BY M.id
      ORDER BY COUNT(*) DESC
      LIMIT ${number}`;
  }
}
