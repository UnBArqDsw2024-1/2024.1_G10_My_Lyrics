import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { LikeMusicUseCase } from "../../../useCases/LikeMusicUseCase";

export class LikeMusicController implements IController {
  constructor(private likeMusicUseCase: LikeMusicUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const user_id = request.user!;

    const likeMusicSchema = z.object({
      music_id: z.string().uuid(),
    });
    const body = likeMusicSchema.parse(request.body);

    const like = await this.likeMusicUseCase.execute({
      user_id,
      music_id: body.music_id,
    });

    return response.status(201).json(like);
  }
}
