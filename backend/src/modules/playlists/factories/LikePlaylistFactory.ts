import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../../users/infra/database/repositories/UserRepository";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { LikePlaylistController } from "../infra/http/controllers/LikePlaylistController";
import { LikePlaylistUseCase } from "../useCases/LikePlaylistUseCase";

export class LikePlaylistUseCaseFactory implements ICommandFactory {
  createCommand(): LikePlaylistUseCase {
    return new LikePlaylistUseCase(
      PlaylistRepository.getInstance(),
      UserRepository.getInstance(),
    );
  }
}

export class LikePlaylistControllerFactory implements IControllerFactory {
  createController(): LikePlaylistController {
    return new LikePlaylistController(
      new LikePlaylistUseCaseFactory().createCommand(),
    );
  }
}
