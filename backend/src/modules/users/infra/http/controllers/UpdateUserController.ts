import type { Request, Response } from "express";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { GetUserUseCase } from "../../../useCases/GetUserUseCase";
import { UpdateUserUseCase } from "../../../useCases/UpdateUserUseCase";
import { z } from "zod";

export class UpdateUserController implements IController {
  constructor(private updateUserUseCase: UpdateUserUseCase) { }

  async handler(request: Request, response: Response): Promise<Response> {
    const UpdateUserBodySchema = z.object({
      name: z.string().max(200).optional(),
      email: z.string().email().optional(),
    });
    const UpdateUserParamsSchema = z.object({
      id: z.string(),
    });

    const body = UpdateUserBodySchema.parse(request.body);
    const params = UpdateUserParamsSchema.parse(request.params);

    if (body.name === undefined && body.email === undefined) {
      throw new Error("You must provide either name or email to update");
    }

    const { id } = params;
    const { name, email } = body;

    const user = await this.updateUserUseCase.execute({
      id,
      name,
      email,
    });

    return response.json(user);
  }
}
