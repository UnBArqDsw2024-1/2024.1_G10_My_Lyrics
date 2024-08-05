import type { Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "../../../../../shared/errors/BadRequestError";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { UpdateUserUseCase } from "../../../useCases/UpdateUserUseCase";

export class UpdateUserController implements IController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

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
      throw new BadRequestError(
        "You must provide either name or email to update",
      );
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
