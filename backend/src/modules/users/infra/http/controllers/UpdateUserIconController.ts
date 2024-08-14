import type { Request, Response } from "express";
import { BadRequestError } from "../../../../../shared/errors/BadRequestError";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { UpdateUserIconUseCase } from "../../../useCases/UpdateUserIconUseCase";

export class UpdateUserIconController implements IController {
  constructor(private updateUserIconUseCase: UpdateUserIconUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const user_id = request.user!;

    const file = request.file;
    if (!file) {
      throw new BadRequestError("Missing image in multipart form data");
    }

    const user = await this.updateUserIconUseCase.execute({
      user_id,
      filepath: file.filename,
    });

    return response.json(user);
  }
}
