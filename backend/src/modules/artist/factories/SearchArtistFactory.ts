import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { ArtistRepository } from "../infra/database/repositories/ArtistRepository";
import { SearchArtistController } from "../infra/http/controllers/SearchArtistController";
import { SearchArtistUseCase } from "../useCases/SearchArtistUseCase";

export class SearchArtistUseCaseFactory implements ICommandFactory {
    createCommand() {
        return new SearchArtistUseCase(ArtistRepository.getInstance());
    }
}

export class SearchArtistControllerFactory implements IControllerFactory {
    createController() {
        return new SearchArtistController(
            new SearchArtistUseCaseFactory().createCommand(),
        );
    }
}