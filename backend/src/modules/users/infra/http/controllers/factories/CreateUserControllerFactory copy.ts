import { GetUserUseCase } from "../../../../useCases/GetUserUseCase";
import { UserRepository } from "../../../database/repositories/UserRepository";

export function GetUserControllerFactory() {
  return new GetUserUseCase(
    new UserRepository()
  )
}