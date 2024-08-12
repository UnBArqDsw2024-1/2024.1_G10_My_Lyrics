import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../repositories/IArtistRepository"; 

interface ICreateLikeArtistDTO {
    user_id: string;
    artist_id: string;
}

export class LikeArtistUseCase implements ICommand<ICreateLikeArtistDTO, void> {
    constructor(private artistRepository: IArtistRepository) {}

    async execute({ user_id, artist_id }: ICreateLikeArtistDTO): Promise<void> {
        await this.artistRepository.likes(user_id, artist_id);
    }
}

export class UnlikeArtistUseCase implements ICommand<ICreateLikeArtistDTO, void> {
    constructor(private artistRepository: IArtistRepository) {}

    async execute({ user_id, artist_id }: ICreateLikeArtistDTO): Promise<void> {
        await this.artistRepository.unlikes(user_id, artist_id);
    }
}