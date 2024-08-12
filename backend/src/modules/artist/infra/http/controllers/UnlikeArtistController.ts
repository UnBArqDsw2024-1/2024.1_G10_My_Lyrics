import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";

import type { UnlikeArtistUseCase } from "../../../useCases/LikeArtistUseCase";

export class UnlikeArtistController implements IController {
  constructor(private unlikeArtistUseCase: UnlikeArtistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const user_id = request.user!;

    const unlikeArtistSchema = z.object({
      artist_id: z.string().uuid(),
    });
    const params = unlikeArtistSchema.parse(request.params);

    await this.unlikeArtistUseCase.execute({
      user_id,
      artist_id: params.artist_id,
    });

    return response.status(200).send();
  }
}
