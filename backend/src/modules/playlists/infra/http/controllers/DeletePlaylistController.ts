import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { DeletePlaylistUseCase } from "../../../useCases/DeletePlaylistUseCase";

export class DeletePlaylistController implements IController {
  constructor(private deletePlaylistUseCase: DeletePlaylistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const deletePlaylistSchema = z.object({
      id: z.string().uuid(),
    });
    const params = deletePlaylistSchema.parse(request.params);
    const userId = request.user!;

    await this.deletePlaylistUseCase.execute({ ...params, userId });

    return response.status(204).send();
  }
}
