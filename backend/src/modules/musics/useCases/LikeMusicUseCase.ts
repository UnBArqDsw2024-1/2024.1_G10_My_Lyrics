import type { ICommand } from "../../../shared/patterns/Command/ICommand";
import type { IMusicRepository } from "../repositories/IMusicRepository"; // Import the IMusicRepository type

interface ICreateLIkeMusicDTO {
    user_id: string;
    music_id: string;
}

export class LikeMusicUseCase implements ICommand<ICreateLIkeMusicDTO, void> {
    constructor(private musicRepository: IMusicRepository) {}

    async execute({ user_id, music_id }: ICreateLIkeMusicDTO): Promise<void> {
        const music = await this.musicRepository.getById(music_id);

        await this.musicRepository.likes(user_id, music_id);
    }
}