import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";

import type { LikeArtistUseCase } from "../../../useCases/LikeArtistUseCase";

export class LikeArtistController implements IController {
  constructor(private likeArtistUseCase: LikeArtistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const likeArtistSchema = z.object({
      artist_id: z.string().uuid(),
    });
    const params = likeArtistSchema.parse(request.params);
    const user_id = request.user!;

    await this.likeArtistUseCase.execute({
      user_id,
      artist_id: params.artist_id,
    });

    return response.status(200).send();
  }
}
