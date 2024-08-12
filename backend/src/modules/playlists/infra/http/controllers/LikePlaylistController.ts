import type { Request, Response } from "express";
import { z } from "zod";
import type { ICommand } from "../../../../../shared/patterns/Command/ICommand";
import type { LikePlaylistUseCase } from "../../../useCases/LikePlaylistUseCase";

export class LikePlaylistController implements ICommand<Request, Response> {
  constructor(private likePlaylistUseCase: LikePlaylistUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const likePlaylistSchema = z.object({
      playlistId: z.string().uuid(),
      user_Id: z.string().uuid(),
    });

    try {
      const body = likePlaylistSchema.parse(request.body);
      await this.likePlaylistUseCase.execute(body);
      return response.status(204).send(); // No Content
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: error.errors }); // Bad Request
      }
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async handler(request: Request, response: Response): Promise<Response> {
    return this.execute(request, response);
  }
}
