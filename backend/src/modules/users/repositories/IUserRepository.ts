import type { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  create(user: Prisma.UserCreateInput): Promise<User>;
  findOneByName(name: string): Promise<User | null>;
}
