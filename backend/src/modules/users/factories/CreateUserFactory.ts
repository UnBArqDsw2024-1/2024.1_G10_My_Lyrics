import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { BcryptHashFactory } from "../../../shared/patterns/HashAdapter/BcryptHashAdapter";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { CreateUserController } from "../infra/http/controllers/CreateUserController";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

export class CreateUserUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new CreateUserUseCase(
      UserRepository.getInstance(),
      new BcryptHashFactory().createHash(),
    );
  }
}

export class CreateUserControllerFactory implements IControllerFactory {
  createController(): IController {
    return new CreateUserController(
      new CreateUserUseCaseFactory().createCommand(),
    );
  }
}
