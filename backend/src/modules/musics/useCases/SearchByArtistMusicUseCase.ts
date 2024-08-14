import type { Music } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository";

interface IRequest {
	artistId: string;
}

type IResponse = Music[];

export class SearchByArtistMusicUseCase
	implements ICommand<IRequest, IResponse>
{
	constructor(private musicRepository: IMusicRepository) {}

	public async execute({ artistId }: IRequest): Promise<Music[]> {
		const musics = await this.musicRepository.searchByArtist(artistId);

		return musics;
	}
}
