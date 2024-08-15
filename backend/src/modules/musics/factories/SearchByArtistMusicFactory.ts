import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";
import { SearchByArtistMusicController } from "../infra/http/controllers/SearchByArtistMusicController";
import { SearchByArtistMusicUseCase } from "../useCases/SearchByArtistMusicUseCase";

export class SearchByArtistMusicUseCaseFactory implements ICommandFactory {
  public createCommand() {
    return new SearchByArtistMusicUseCase(MusicRepository.getInstance());
  }
}

export class SearchByArtistMusicControllerFactory
  implements IControllerFactory
{
  public createController(): IController {
    return new SearchByArtistMusicController(
      new SearchByArtistMusicUseCaseFactory().createCommand(),
    );
  }
}
