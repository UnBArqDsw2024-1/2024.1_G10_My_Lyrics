import { AuthFactory } from "../../../shared/patterns/AuthAdapter/JwtAuthAdapter";
import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { BcryptHashFactory } from "../../../shared/patterns/HashAdapter/BcryptHashAdapter";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { AuthenticateUserController } from "../infra/http/controllers/AuthenticateUserController";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

export class AuthenticateUserFactory implements ICommandFactory {
  createCommand() {
    return new AuthenticateUserUseCase(
      UserRepository.getInstance(),
      new BcryptHashFactory().createHash(),
      new AuthFactory().createAuth(),
    );
  }
}

export class AuthenticateUserControllerFactory implements IControllerFactory {
  createController(): IController {
    return new AuthenticateUserController(
      new AuthenticateUserFactory().createCommand(),
    );
  }
}
