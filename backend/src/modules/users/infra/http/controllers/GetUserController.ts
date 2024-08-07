import type { Request, Response } from "express";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { GetUserUseCase } from "../../../useCases/GetUserUseCase";

export class GetUserController implements IController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const id = request.user;

    const user = await this.getUserUseCase.execute({
      id,
    });

    return response.json(user);
  }
}
