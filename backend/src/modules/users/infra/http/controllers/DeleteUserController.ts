import type { Request, Response } from "express";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { DeleteUserUseCase } from "../../../useCases/DeleteUserUseCase";

export class DeleteUserController implements IController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const id = request.user;

    await this.deleteUserUseCase.execute({ id });

    return response.status(200).send();
  }
}
