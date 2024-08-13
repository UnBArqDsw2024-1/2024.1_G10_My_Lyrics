import type { Artist } from "@prisma/client";
import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IArtistRepository } from "../repositories/IArtistRepository";

interface ISearchArtistDTO {
    name: string;
}

export class SearchArtistUseCase implements ICommand<ISearchArtistDTO, Artist[]> {
    constructor(private artistRepository: IArtistRepository) {}

    async execute({ name }: ISearchArtistDTO): Promise<Artist[]> {
        return this.artistRepository.searchByName(name);
    }
}