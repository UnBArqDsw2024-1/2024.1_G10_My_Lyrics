import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";
import { CreateMusicController } from "../infra/http/controllers/CreateMusicController";
import { CreateMusicUseCase } from "../useCases/CreateMusicUseCase";
export class CreateMusicUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new CreateMusicUseCase(MusicRepository.getInstance());
  }
}

export class CreateMusicControllerFactory implements IControllerFactory {
  createController(): IController {
    return new CreateMusicController(
      new CreateMusicUseCaseFactory().createCommand(),
    );
  }
}
