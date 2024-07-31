import type { Prisma, PrismaClient, User } from "@prisma/client";
import { DatabaseConnection } from "../../../../../infra/database/GetConnection";
import type { IUserRepository } from "../../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = DatabaseConnection.getInstance();
  }

  async create(userDTO: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: userDTO,
    });

    return user;
  }

  async findOneByName(name: string): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        name,
      },
    });

    return user;
  }
}
