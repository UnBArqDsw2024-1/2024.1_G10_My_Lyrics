import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { UserRepository } from "../infra/database/repositories/UserRepository";
import { BcryptHashFactory } from "../../../shared/patterns/HashAdapter/BcryptHashAdapter";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";
import { JwtFactory } from "../../../shared/patterns/JwtAdapter/JwtAdapter";
import { AuthenticateUserController } from "../infra/http/controllers/AuthenticateUserController";

export class AuthenticateUserFactory implements ICommandFactory {
  createCommand() {
    return new AuthenticateUserUseCase(UserRepository.getInstance(), new BcryptHashFactory().createHash(), new JwtFactory().createJwt());
  }
}

export class AuthenticateUserControllerFactory implements IControllerFactory {
  createController(): IController {
    return new AuthenticateUserController(
      new AuthenticateUserFactory().createCommand(),
    );
  }
}
