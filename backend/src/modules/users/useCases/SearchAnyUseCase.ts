import type { Artist, Music, User } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../../artist/repositories/IArtistRepository";
import type { IMusicRepository } from "../../musics/repositories/IMusicRepository";
import type { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
	text: string;
}

interface IResponse {
	artists: Artist[];
	musics: Music[];
	users: User[];
}

export class SearchAnyUseCase implements ICommand<IRequest, IResponse> {
	constructor(
		private artistRepository: IArtistRepository,
		private musicRepository: IMusicRepository,
		private userRepository: IUserRepository,
	) {}

	public async execute({ text }: IRequest): Promise<IResponse> {
		const artists = await this.artistRepository.searchByName(text);
		const musics = await this.musicRepository.searchByTitle(text);
		const users = await this.userRepository.searchByName(text);

		return {
			artists,
			musics,
			users,
		};
	}
}
