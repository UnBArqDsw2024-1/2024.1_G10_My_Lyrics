import { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { FollowingUserController } from "../infra/http/controllers/FollowingUserController";
import { FollowingUserUseCase } from "../useCases/FollowingUserUseCase";

export class FollowingUserUseCaseFactory implements ICommandFactory {
  createCommand(): FollowingUserUseCase {
    return new FollowingUserUseCase(
      UserRepository.getInstance(),
    );
  }
}


export class FollowingUserControllerFactory implements IControllerFactory {
  createController(): FollowingUserController {
    return new FollowingUserController(
      new FollowingUserUseCaseFactory().createCommand(),
    );
  }
}