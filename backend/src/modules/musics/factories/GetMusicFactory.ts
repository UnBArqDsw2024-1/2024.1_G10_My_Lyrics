import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { MusicRepository } from "../infra/database/repositories/MusicRepository";
import { GetMusicController } from "../infra/http/controllers/GetMusicController";
import { GetMusicUseCase } from "../useCases/GetMusicUseCase";

export class GetMusicUseCaseFactory implements ICommandFactory {
  public createCommand() {
    return new GetMusicUseCase(MusicRepository.getInstance());
  }
}


export class GetMusicControllerFactory implements IControllerFactory {
  public createController(): IController { 
    return new GetMusicController(new GetMusicUseCaseFactory().createCommand());
  }
}