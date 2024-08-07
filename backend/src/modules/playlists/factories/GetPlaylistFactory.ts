import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { GetPlaylistController } from "../infra/http/controllers/GetPlaylistController"; 
import { GetPlaylistUseCase } from "../useCases/GetPlaylistUseCase";

export class GetPlaylistUseCaseFactory implements ICommandFactory {
  createCommand(): GetPlaylistUseCase {
    return new GetPlaylistUseCase(PlaylistRepository.getInstance());
  }
}

export class GetPlaylistControllerFactory implements ICommandFactory {
  createCommand(): GetPlaylistController {
    return new GetPlaylistController(
      new GetPlaylistUseCaseFactory().createCommand(),
    );
  }

  createController(): GetPlaylistController {
    return this.createCommand();
  }
}
