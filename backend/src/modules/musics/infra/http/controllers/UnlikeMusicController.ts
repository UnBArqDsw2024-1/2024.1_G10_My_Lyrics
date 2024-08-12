import type { IController } from "../../../../../shared/patterns/Controller/IController";
import { Request, Response } from "express";
import { z } from "zod";
import { UnlikeMusicUseCase } from "../../../useCases/LikeMusicUseCase";

export class UnlikeMusicController implements IController {
  constructor(private likeMusicUseCase: UnlikeMusicUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    
    const user_id = request.user!;
    
    const likeMusicSchema = z.object({
      music_id: z.string().uuid(),

    });
    const body = likeMusicSchema.parse(request.body);

    const like = await this.likeMusicUseCase.execute({user_id, music_id: body.music_id});

    return response.status(201).json(like);
  }
}