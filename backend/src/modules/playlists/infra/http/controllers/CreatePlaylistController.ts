import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { CreatePlaylistUseCase } from "../../../useCases/CreatePlaylistUseCase";

export class CreatePlaylistController implements IController {
  constructor(private createPlaylistUseCase: CreatePlaylistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const createPlaylistBodySchema = z.object({
      title: z.string().max(200),
    });
    const body = createPlaylistBodySchema.parse(request.body);
    const user_id = request.user!;

    const playlist = await this.createPlaylistUseCase.execute({
      title: body.title,
      user_id,
    });

    return response.status(201).json(playlist);
  }
}
