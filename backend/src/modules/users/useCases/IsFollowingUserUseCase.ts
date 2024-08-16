import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { ICommand } from "../../../shared/patterns/Command/ICommand";
import { IUserRepository } from "../repositories/IUserRepository";

interface IIsFollowingDTO {
    user_id: string;
    following_id: string;
    }

export class IsFollowingUserUseCase implements ICommand<IIsFollowingDTO, void> {
    constructor(
        private userRepository: IUserRepository,
    ) {}
    
    async execute({ user_id, following_id }: IIsFollowingDTO): Promise<void> {
        const user = await this.userRepository.findOneById(user_id);
        if (!user) {
            throw new NotFoundError("User was not found");
        }
        
        await this.userRepository.isFollowing(user_id, following_id);
    }
}