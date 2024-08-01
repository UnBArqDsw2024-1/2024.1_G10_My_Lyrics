import type { Request, Response } from "express";
import type { GetUserUseCase } from "../../../useCases/GetUserUseCase";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const user = await this.getUserUseCase.execute({
      name,
    });

    return response.json(user);
  }
}
