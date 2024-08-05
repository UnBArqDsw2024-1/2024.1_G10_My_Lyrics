import { IPlaylistRepository } from "../repositories/IPlaylistRepository";
import { ICommand } from "../../../shared/patterns/Command/ICommand";

interface IRequest {
    id: string;
}

export class DeletePlaylistUseCase implements ICommand<IRequest, void> {
    constructor(
        private playlistRepository: IPlaylistRepository,
    ) {}

    async execute({ id }: IRequest): Promise<void> {
        await this.playlistRepository.deleteById(id);
    }
}
