import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { GetPlaylistUseCase } from "../../../useCases/GetPlaylistUseCase";

export class GetPlaylistController implements IController {
  constructor(private getPlaylistUseCase: GetPlaylistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const getPlaylistSchema = z.object({
      id: z.string().uuid(),
    });
    const params = getPlaylistSchema.parse(request.params);

    const playlist = await this.getPlaylistUseCase.execute(params);

    return response.status(200).json(playlist);
  }
}
