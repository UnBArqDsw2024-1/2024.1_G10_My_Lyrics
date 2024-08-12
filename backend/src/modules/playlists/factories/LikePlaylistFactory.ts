import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { LikePlaylistController } from "../infra/http/controllers/LikePlaylistController";
import { LikePlaylistUseCase } from "../useCases/LikePlaylistUseCase";

export class LikePlaylistUseCaseFactory implements ICommandFactory {
  createCommand(): LikePlaylistUseCase {
    return new LikePlaylistUseCase(PlaylistRepository.getInstance());
  }
}

export class LikePlaylistControllerFactory implements ICommandFactory {
  createCommand(): LikePlaylistController {
    return new LikePlaylistController(
      new LikePlaylistUseCaseFactory().createCommand(),
    );
  }

  createController(): LikePlaylistController {
    return this.createCommand();
  }
}
