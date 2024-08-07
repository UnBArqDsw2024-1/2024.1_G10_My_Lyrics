import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { SearchPlaylistController } from "../infra/http/controllers/SearchPlaylistController";
import { SearchPlaylistUseCase } from "../useCases/SearchPlaylistUseCase";

export class SearchPlaylistUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new SearchPlaylistUseCase(PlaylistRepository.getInstance());
  }
}

export class SearchPlaylistControllerFactory implements IControllerFactory {
  createController() {
    return new SearchPlaylistController(
      new SearchPlaylistUseCaseFactory().createCommand(),
    );
  }
}
