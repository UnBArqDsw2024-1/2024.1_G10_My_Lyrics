import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { GetUserUseCase } from "../../../useCases/GetUserUseCase";

export class GetUserByIdController implements IController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const paramsSchema = z.object({
      user_id: z.string().uuid(),
    });

    const params = paramsSchema.parse(request.params);
    const user = await this.getUserUseCase.execute({
      id: params.user_id,
    });

    return response.json(user);
  }
}
