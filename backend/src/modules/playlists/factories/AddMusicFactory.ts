import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { PlaylistRepository } from "../infra/database/repositories/PlaylistRepository";
import { AddMusicController } from "../infra/http/controllers/AddMusicController";
import { AddMusicUseCase } from "../useCases/AddMusicUseCase";

export class AddMusicUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new AddMusicUseCase(PlaylistRepository.getInstance());
  }
}

export class AddMusicControllerFactory implements IControllerFactory {
  createController() {
    return new AddMusicController(new AddMusicUseCaseFactory().createCommand());
  }
}
