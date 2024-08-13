import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { LikePlaylistUseCase } from "../../../useCases/LikePlaylistUseCase";

export class LikePlaylistController implements IController {
  constructor(private likePlaylistUseCase: LikePlaylistUseCase) { }

  async handler(request: Request, response: Response): Promise<Response> {
    const likePlaylistSchema = z.object({
      playlistId: z.string().uuid(),
      user_Id: z.string().uuid(),
    });
    const body = likePlaylistSchema.parse({
      playlistId: request.params.id,
      user_Id: request.body.user_id
    });

    await this.likePlaylistUseCase.execute(body);
    return response.status(204).send();
  }
}