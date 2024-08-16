import type { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  create(user: Prisma.UserCreateInput): Promise<User>;
  findOneById(name: string): Promise<User | null>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  followingUser(user_id: string, following_id: string): Promise<void>;
}
