import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { GetUserController } from "../infra/http/controllers/GetUserController";
import { GetUserUseCase } from "../useCases/GetUserUseCase";

export class GetUserUseCaseFactory implements ICommandFactory {
  createCommand() {
    return new GetUserUseCase(UserRepository.getInstance());
  }
}

export class GetUserControllerFactory implements IControllerFactory {
  createController() {
    return new GetUserController(new GetUserUseCaseFactory().createCommand());
  }
}
