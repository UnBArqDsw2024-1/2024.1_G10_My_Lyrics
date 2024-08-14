import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { AddMusicUseCase } from "../../../useCases/AddMusicUseCase";


export class AddMusicController implements IController {
  constructor(private addMusicUseCase: AddMusicUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const paramsSchema = z.object({
      playlist_id: z.string().uuid(),
    });

    const bodySchema = z.object({
      music_id: z.string().uuid(),
    });

    const user_id = request.user!;

    const { playlist_id } = paramsSchema.parse(request.params);
    const { music_id } = bodySchema.parse(request.body);

    const playlist = await this.addMusicUseCase.execute(
      {
        playlist_id,
        music_id,
        user_id,
      }
    );

    return response.status(200).json(playlist);
  }
}
