import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { UpdateUserController } from "../infra/http/controllers/UpdateUserController";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase";

export class UpdateUserUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new UpdateUserUseCase(UserRepository.getInstance());
  }
}

export class UpdateUserControllerFactory implements IControllerFactory {
  createController() {
    return new UpdateUserController(
      new UpdateUserUseCaseFactory().createCommand(),
    );
  }
}
