import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { UpdateUserIconController } from "../infra/http/controllers/UpdateUserIconController";
import { UpdateUserIconUseCase } from "../useCases/UpdateUserIconUseCase";

export class UpdateUserIconUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new UpdateUserIconUseCase(UserRepository.getInstance());
  }
}

export class UpdateUserIconControllerFactory implements IControllerFactory {
  createController(): IController {
    return new UpdateUserIconController(
      new UpdateUserIconUseCaseFactory().createCommand(),
    );
  }
}
