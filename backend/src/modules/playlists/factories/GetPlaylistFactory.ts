import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { GetPlaylistController } from "../infra/http/controllers/GetPlaylistController";
import { GetPlaylistUseCase } from "../useCases/GetPlaylistUseCase";

export class GetPlaylistUseCaseFactory implements ICommandFactory {
  createCommand(): GetPlaylistUseCase {
    return new GetPlaylistUseCase(PlaylistRepository.getInstance());
  }
}

export class GetPlaylistControllerFactory implements IControllerFactory {
  createController(): GetPlaylistController {
    return new GetPlaylistController(
      new GetPlaylistUseCaseFactory().createCommand(),
    );
  }
}
