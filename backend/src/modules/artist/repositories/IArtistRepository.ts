import { Artist, Prisma } from "@prisma/client";

export interface IArtistRepository {
    getById(id: string): Promise<Artist | null>;
    likes(user_id: string, artist_id: string): Promise<void>;
    unlikes(user_id: string, artist_id: string): Promise<void>;
    }