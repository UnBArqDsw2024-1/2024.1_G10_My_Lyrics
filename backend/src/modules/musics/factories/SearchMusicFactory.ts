import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";
import { SearchMusicUseCase } from "../useCases/SearchMusicUseCase";
import { SearchMusicController } from "../infra/http/controllers/SearchMusicController";

export class SearchMusicUseCaseFactory implements ICommandFactory {
    createCommand() {
        return new SearchMusicUseCase(MusicRepository.getInstance());
      }
}

export class SearchMusicControllerFactory implements IControllerFactory {
    createController() {
        return new SearchMusicController(
            new SearchMusicUseCaseFactory().createCommand(),
        );
    }
}