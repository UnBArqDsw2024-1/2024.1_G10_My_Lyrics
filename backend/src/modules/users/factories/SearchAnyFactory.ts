import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { ArtistRepository } from "../../artist/infra/database/repositories/ArtistRepository";
import { MusicRepository } from "../../musics/infra/database/repositories/MusicRepository";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { SearchAnyController } from "../infra/http/controllers/SearchAnyUseCaseController";
import { SearchAnyUseCase } from "../useCases/SearchAnyUseCase";

export class SearchAnyUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new SearchAnyUseCase(
      ArtistRepository.getInstance(),
      MusicRepository.getInstance(),
      UserRepository.getInstance(),
    );
  }
}

export class SearchAnyControllerFactory implements IControllerFactory {
  createController() {
    return new SearchAnyController(
      new SearchAnyUseCaseFactory().createCommand(),
    );
  }
}
