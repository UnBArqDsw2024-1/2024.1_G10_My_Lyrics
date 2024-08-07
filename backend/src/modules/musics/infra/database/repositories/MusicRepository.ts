import type { Music, Prisma, PrismaClient } from "@prisma/client";
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

  create(music: Prisma.MusicCreateInput): Promise<Music> {
    return this.prismaClient.music.create({ data: music });
  }

  async searchByTitle(name: string): Promise<Music[]> {
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
  ): Promise<(Music & {count: BigInt})[]> {
    return this.prismaClient.$queryRaw`
      SELECT COUNT(*), M.* FROM "MusicAccess" MA 
      INNER JOIN "Music" M ON M.id = MA."musicId"
      WHERE MA."date" BETWEEN ${dataInit} AND ${dataFinished}
      GROUP BY M.id
      ORDER BY COUNT(*) DESC
      LIMIT ${number}`;
  }
}
