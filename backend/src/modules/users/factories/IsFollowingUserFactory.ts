import { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { IsFollowingUserController } from "../infra/http/controllers/IsFollowingUserController";
import { IsFollowingUserUseCase } from "../useCases/IsFollowingUserUseCase";

export class IsFollowingUserUseCaseFactory implements ICommandFactory {
  createCommand(): IsFollowingUserUseCase {
    return new IsFollowingUserUseCase(
      UserRepository.getInstance(),
    );
  }
}


export class IsFollowingUserControllerFactory implements IControllerFactory {
  createController(): IsFollowingUserController {
    return new IsFollowingUserController(
      new IsFollowingUserUseCaseFactory().createCommand(),
    );
  }
}