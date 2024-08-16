import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { ICommand } from "../../../shared/patterns/Command/ICommand";
import { IUserRepository } from "../repositories/IUserRepository";

interface IFollowingDTO {
    user_id: string;
    following_id: string;
    }

export class FollowingUserUseCase implements ICommand<IFollowingDTO, void> {
    constructor(
        private userRepository: IUserRepository,
    ) {}
    
    async execute({ user_id, following_id }: IFollowingDTO): Promise<void> {
        const user = await this.userRepository.findOneById(user_id);
        if (!user) {
            throw new NotFoundError("User was not found");
        }
        
        await this.userRepository.followingUser(user_id, following_id);
    }
}