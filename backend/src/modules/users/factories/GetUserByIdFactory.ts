import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { GetUserByIdController } from "../infra/http/controllers/GetUserByIdController";
import { GetUserUseCaseFactory } from "./GetUserFactory";

export class GetUserByIdControllerFactory implements IControllerFactory {
  createController() {
    return new GetUserByIdController(
      new GetUserUseCaseFactory().createCommand(),
    );
  }
}
