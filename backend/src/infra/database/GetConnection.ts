import { PrismaClient } from "@prisma/client";

export class DatabaseConnection {
  private static INSTANCE: PrismaClient | null;
  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!DatabaseConnection.INSTANCE) {
      DatabaseConnection.INSTANCE = new PrismaClient();
    }

    return DatabaseConnection.INSTANCE;
  }
}
