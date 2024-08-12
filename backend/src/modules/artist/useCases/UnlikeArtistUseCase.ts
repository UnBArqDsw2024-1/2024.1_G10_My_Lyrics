import { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../repositories/IArtistRepository";

interface ICreateLikeArtistDTO {
    user_id: string;
    music_id: string;
}

export class UnlikeArtistUseCase implements ICommand<ICreateLikeArtistDTO, void> {
    constructor(private ArtistRepository: IArtistRepository) {}

    async execute({ user_id, music_id }: ICreateLikeArtistDTO): Promise<void> {
        const music = await this.ArtistRepository.getById(music_id);

        await this.ArtistRepository.unlikes(user_id, music_id);
    }
}