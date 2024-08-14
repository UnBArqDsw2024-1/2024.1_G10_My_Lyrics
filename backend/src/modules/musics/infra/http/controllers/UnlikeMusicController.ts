import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { UnlikeMusicUseCase } from "../../../useCases/LikeMusicUseCase";

export class UnlikeMusicController implements IController {
  constructor(private likeMusicUseCase: UnlikeMusicUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const likeMusicSchema = z.object({
      music_id: z.string().uuid(),
    });
    const params = likeMusicSchema.parse(request.params);
    const user_id = request.user!;

    await this.likeMusicUseCase.execute({
      user_id,
      music_id: params.music_id,
    });

    return response.status(200).send();
  }
}
