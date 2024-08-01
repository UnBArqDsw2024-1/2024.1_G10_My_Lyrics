import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { CreatePlaylistController } from "../infra/http/controllers/CreatePlaylistController";
import { CreatePlaylistUseCase } from "../useCases/CreatePlaylistUseCase";

export class CreatePlaylistUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new CreatePlaylistUseCase(PlaylistRepository.getInstance());
  }
}

export class CreatePlaylistControllerFactory implements IControllerFactory {
  createController() {
    return new CreatePlaylistController(
      new CreatePlaylistUseCaseFactory().createCommand(),
    );
  }
}
