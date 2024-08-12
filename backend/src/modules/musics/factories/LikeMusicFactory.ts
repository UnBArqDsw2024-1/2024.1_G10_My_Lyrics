import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";

import { LikeMusicController } from "../infra/http/controllers/LikeMusicController";
import { LikeMusicUseCase } from "../useCases/LikeMusicUseCase"; // Add this import


export class LikeMusicUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new LikeMusicUseCase(MusicRepository.getInstance());
  }
}

export class LikeMusicControllerFactory implements IControllerFactory {
  createController(): IController {
    return new LikeMusicController(
      new LikeMusicUseCaseFactory().createCommand(),
    );
  }
}