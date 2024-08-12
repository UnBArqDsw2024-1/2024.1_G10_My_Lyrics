import type { IController } from "../../../../../shared/patterns/Controller/IController";
import { Request, Response } from "express";
import { z } from "zod";

import { LikeArtistUseCase } from "../../../useCases/LikeArtistUseCase";

export class LikeArtistController implements IController {
  constructor(private likeArtistUseCase: LikeArtistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    
    const user_id = request.user!;
    
    const likeArtistSchema = z.object({
      artist_id: z.string().uuid(),

    });
    const body = likeArtistSchema.parse(request.body);

    const like = await this.likeArtistUseCase.execute({user_id, artist_id: body.artist_id});

    return response.status(201).json(like);
  }
}