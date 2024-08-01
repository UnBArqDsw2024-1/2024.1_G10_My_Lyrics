import type { Request, Response } from "express";
import { z } from "zod";
import type { DeleteUserUseCase } from "../../../useCases/DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const deleteUserSchema = z.object({
      id: z.string(),
    });
    const params = deleteUserSchema.parse(request.params);

    await this.deleteUserUseCase.execute(params);

    return response.status(200).send();
  }
}
