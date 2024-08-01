import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { DeleteUserController } from "../infra/http/controllers/DeleteUserController";
import { DeleteUserUseCase } from "../useCases/DeleteUserUseCase";

export class DeleteUserUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new DeleteUserUseCase(UserRepository.getInstance());
  }
}

export class DeleteUserControllerFactory implements IControllerFactory {
  createController(): IController {
    return new DeleteUserController(
      new DeleteUserUseCaseFactory().createCommand(),
    );
  }
}
