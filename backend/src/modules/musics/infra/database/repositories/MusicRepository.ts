import type { Music, Prisma, PrismaClient, User, Verse } from "@prisma/client";
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

  async getById(id: string): Promise<(Music & { verses: Verse[]; likes: User[] }) | null> {
    const music = await this.prismaClient.music.findUnique({
      where: {
        id,
      },
      include: {
        verses: true,
        likes: true,
      },
    });

    return music;
  }
}
