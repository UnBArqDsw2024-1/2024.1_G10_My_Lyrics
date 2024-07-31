import { CreateUserUseCase } from "../../../../useCases/CreateUserUseCase";
import { UserRepository } from "../../../database/repositories/UserRepository";

export function CreateUserControllerFactory() {
  return new CreateUserUseCase(new UserRepository());
}
