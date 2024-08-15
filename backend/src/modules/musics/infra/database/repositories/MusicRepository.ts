import {
	type Artist,
	type Music,
	Prisma,
	type PrismaClient,
	type Verse,
} from "@prisma/client";
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

	public async create(music: Prisma.MusicCreateInput): Promise<Music> {
		return this.prismaClient.music.create({ data: music });
	}

	public async getById(
		id: string,
	): Promise<(Music & { verses: Verse[]; likes: number }) | null> {
		const music = await this.prismaClient.music.findUnique({
			where: { id },
			include: {
				verses: {
					orderBy: {
						startTime: "asc",
					},
				},
				_count: {
					select: { likes: true },
				},
				album: {
					include: { artists: true },
				},
			},
		});
		if (!music) {
			return null;
		}

		const {
			_count: { likes },
			...remaining
		} = music;
		return {
			...remaining,
			likes,
		};
	}

	public async searchByTitle(name: string): Promise<Music[]> {
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
	): Promise<
		(Music & { count: bigint; artists: Artist[]; verses: Verse[] })[]
	> {
		const res: (Music & {
			count: bigint;
			artists: Artist[];
			verses: Verse[];
		})[] = await this.prismaClient.$queryRaw`
    SELECT
      COUNT(*) as count,
      "mu".*,
      COALESCE(JSON_AGG(DISTINCT v.*) FILTER (WHERE v.id IS NOT NULL), '[]') AS verses,
      JSON_AGG(DISTINCT ar.*) AS artists
    FROM "MusicAccess" ma
    INNER JOIN "Music" mu ON ma."musicId" = mu.id
    LEFT JOIN "Verse" v ON v."musicId" = mu.id

    INNER JOIN "Album" alb ON mu."albumId" = alb.id
    INNER JOIN "_AlbumArtists" AA ON AA."A" = alb.id
    INNER JOIN "Artist" ar ON ar.id = AA."B"

    WHERE ma."date" BETWEEN ${dataInit} AND ${dataFinished}
    
    GROUP BY mu."id"
    ORDER BY count DESC
    LIMIT ${number}
  `;

		const remaining = number - res.length;
		if (remaining > 0) {
			const alreadyFetched = res.map((e) => e.id);
			const remainingData: (Music & {
				count: bigint;
				artists: Artist[];
				verses: Verse[];
			})[] = await this.prismaClient.$queryRaw`
      SELECT
        0::bigint as count,
        mu.*,
        COALESCE(JSON_AGG(DISTINCT v.*) FILTER (WHERE v.id IS NOT NULL), '[]') AS verses,
        JSON_AGG(DISTINCT ar.*) AS artists
      FROM "Music" mu
      LEFT JOIN "Verse" v ON v."musicId" = mu.id

      INNER JOIN "Album" alb ON mu."albumId" = alb.id
      INNER JOIN "_AlbumArtists" AA ON AA."A" = alb.id
      INNER JOIN "Artist" ar ON ar.id = AA."B"

      WHERE mu."id"::text NOT IN (${Prisma.join(alreadyFetched)})
      GROUP BY mu."id"
      LIMIT ${remaining}
    `;

			return res.concat(remainingData);
		}

		return res;
	}

	public async likes(user_id: string, music_id: string): Promise<void> {
		await this.prismaClient.music.update({
			where: {
				id: music_id,
			},
			data: {
				likes: {
					connect: {
						id: user_id,
					},
				},
			},
		});
	}

	public async unlikes(user_id: string, music_id: string): Promise<void> {
		await this.prismaClient.music.update({
			where: {
				id: music_id,
			},
			data: {
				likes: {
					disconnect: {
						id: user_id,
					},
				},
			},
		});
	}

	public async searchByArtist(artistId: string): Promise<Music[]> {
		const musics = await this.prismaClient.music.findMany({
			where: {
				album: {
					artists: {
						some: {
							id: artistId,
						},
					},
				},
			},
		});

		return musics;
	}
}
