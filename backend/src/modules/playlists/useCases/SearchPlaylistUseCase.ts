import { Playlist } from '@prisma/client';
import { IPlaylistRepository } from '../repositories/IPlaylistRepository';

interface ISearchPlaylistDTO {
	title: string;
}

export class SearchPlaylistUseCase {
	constructor(private playlistRepository: IPlaylistRepository) {}

	async execute({ title }: ISearchPlaylistDTO): Promise<Playlist[]> {
		return this.playlistRepository.searchByTitle(title);
	}
}
