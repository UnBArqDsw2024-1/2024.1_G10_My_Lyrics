import { IController } from "../../../shared/patterns/Controller/IController";
import { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { ArtistRepository } from "../infra/database/repositories/ArtistRepository";
import { LikeArtistController } from "../infra/http/controllers/LikeArtistController";
import { LikeArtistUseCase } from "../useCases/LikeArtistUseCase";

export class LikeArtistUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new LikeArtistUseCase(ArtistRepository.getInstance());
  }
}

export class LikeArtistControllerFactory implements IControllerFactory {
    createController(): IController {
        return new LikeArtistController(
        new LikeArtistUseCaseFactory().createCommand(),
        );
    }
    }