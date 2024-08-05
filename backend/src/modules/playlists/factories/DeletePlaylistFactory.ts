import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { DeletePlaylistController } from "../infra/http/controllers/DeletePlaylistController";
import { DeletePlaylistUseCase } from "../useCases/DeletePlaylistUseCase";

export class DeletePlaylistUseCaseFactory implements ICommandFactory {
    createCommand(): DeletePlaylistUseCase {
        return new DeletePlaylistUseCase(PlaylistRepository.getInstance());
    }
}

export class DeletePlaylistControllerFactory implements ICommandFactory {
    createCommand(): DeletePlaylistController {
        return new DeletePlaylistController(
            new DeletePlaylistUseCaseFactory().createCommand(),
        );
    }

    createController(): DeletePlaylistController {
        return this.createCommand();
    }
}
