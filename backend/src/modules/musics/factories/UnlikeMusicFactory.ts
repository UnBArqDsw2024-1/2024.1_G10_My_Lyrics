import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";

import { UnlikeMusicUseCase } from "../useCases/LikeMusicUseCase";
import { UnlikeMusicController } from "../infra/http/controllers/UnlikeMusicController";

export class UnlikeMusicUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new UnlikeMusicUseCase(MusicRepository.getInstance());
  }
}

export class UnlikeMusicControllerFactory implements IControllerFactory {
  createController(): IController {
    return new UnlikeMusicController(
      new UnlikeMusicUseCaseFactory().createCommand(),
    );
  }
}