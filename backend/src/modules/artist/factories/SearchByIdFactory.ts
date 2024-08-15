import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { ArtistRepository } from "../infra/database/repositories/ArtistRepository";
import { SearchByIdController } from "../infra/http/controllers/SearchByIdController";
import { SearchByIdUseCase } from "../useCases/SearchByIdUseCase";

export class SearchByIdUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new SearchByIdUseCase(ArtistRepository.getInstance());
  }
}

export class SearchByIdControllerFactory implements IControllerFactory {
  createController() {
    return new SearchByIdController(
      new SearchByIdUseCaseFactory().createCommand(),
    );
  }
}
