import type { Prisma, PrismaClient, User } from "@prisma/client";
import { DatabaseConnection } from "../../../../../infra/database/GetConnection";
import type { IUserRepository } from "../../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = DatabaseConnection.getInstance();
  }
  async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }

  private static INSTANCE: UserRepository | null;
  static getInstance(): UserRepository {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  async create(userDTO: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: userDTO,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return updatedUser;
  }
  
  
  
  public async searchByName(name: string): Promise<User[]> {
    return this.prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }


}

