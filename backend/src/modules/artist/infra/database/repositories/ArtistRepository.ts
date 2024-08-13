import type { Artist, PrismaClient } from "@prisma/client";
import { DatabaseConnection } from "../../../../../infra/database/GetConnection";
import type { IArtistRepository } from "../../../repositories/IArtistRepository";

export class ArtistRepository implements IArtistRepository {
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = DatabaseConnection.getInstance();
  }

  private static INSTANCE: ArtistRepository | null;
  public static getInstance() {
    if (!ArtistRepository.INSTANCE) {
      ArtistRepository.INSTANCE = new ArtistRepository();
    }

    return ArtistRepository.INSTANCE;
  }

  public async getById(id: string): Promise<Artist | null> {
    return this.prismaClient.artist.findUnique({ where: { id } });
  }

  public async searchByName(name: string): Promise<Artist[]> {
    return this.prismaClient.artist.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  public async likes(user_id: string, artist_id: string): Promise<void> {
    await this.prismaClient.user.update({
      where: { id: user_id },
      data: {
        likedArtists: {
          connect: { id: artist_id },
        },
      },
    });
  }

  public async unlikes(user_id: string, artist_id: string): Promise<void> {
    await this.prismaClient.user.update({
      where: { id: user_id },
      data: {
        likedArtists: {
          disconnect: { id: artist_id },
        },
      },
    });
  }
}