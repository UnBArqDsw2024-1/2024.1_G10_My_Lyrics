import type { IController } from "../../../../../shared/patterns/Controller/IController";
import { Request, Response } from "express";
import { z } from "zod";

import { UnlikeArtistUseCase } from "../../../useCases/LikeArtistUseCase";


export class UnlikeArtistController implements IController {
    constructor(private unlikeArtistUseCase: UnlikeArtistUseCase) {}
  
    async handler(request: Request, response: Response): Promise<Response> {
      
      const user_id = request.user!;
      
      const unlikeArtistSchema = z.object({
        artist_id: z.string().uuid(),
  
      });
      const body = unlikeArtistSchema.parse(request.body);
  
      const unlike = await this.unlikeArtistUseCase.execute({user_id, artist_id: body.artist_id});
  
      return response.status(201).json(unlike);
    }
  }
