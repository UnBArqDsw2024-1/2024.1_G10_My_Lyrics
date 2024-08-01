import type { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  create(user: Prisma.UserCreateInput): Promise<User>;
  findOneById(name: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
