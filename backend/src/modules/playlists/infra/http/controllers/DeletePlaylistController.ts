import type { Request, Response } from "express";
import { z } from "zod";
import type { ICommand } from "../../../../../shared/patterns/Command/ICommand";
import type { DeletePlaylistUseCase } from "../../../useCases/DeletePlaylistUseCase";

export class DeletePlaylistController implements ICommand<Request, Response> {
  constructor(private deletePlaylistUseCase: DeletePlaylistUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const deletePlaylistSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const params = deletePlaylistSchema.parse(request.params);
      await this.deletePlaylistUseCase.execute(params);
      return response.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: error.errors });
      }
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async handler(request: Request, response: Response): Promise<Response> {
    return this.execute(request, response);
  }
}
