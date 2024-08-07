import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";
import { ListTopMusicsController } from "../infra/http/controllers/ListTopMusicsController";
import { ListTopMusicsUseCase } from "../useCases/ListTopMusicsUseCase";

export class ListTopMusicsUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new ListTopMusicsUseCase(MusicRepository.getInstance());
  }
}

export class ListTopMusicsControllerFactory implements IControllerFactory {
  createController(): IController {
    return new ListTopMusicsController(
      new ListTopMusicsUseCaseFactory().createCommand(),
    );
  }
}
