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
      censoredMusics: z.boolean().optional(),
    });

    const body = UpdateUserBodySchema.parse(request.body);

    if (
      body.name === undefined &&
      body.email === undefined &&
      body.censoredMusics === undefined
    ) {
      throw new BadRequestError(
        "You must provide either name, email or censoredMusics to update",
      );
    }

    const { name, email, censoredMusics } = body;

    const user = await this.updateUserUseCase.execute({
      id: request.user,
      name,
      email,
      censoredMusics,
    });

    return response.json(user);
  }
}
