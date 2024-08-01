import type { Request, Response } from "express";
import { z } from "zod";
import type { CreatePlaylistUseCase } from "../../../useCases/CreatePlaylistUseCase";

export class CreatePlaylistController {
  constructor(private createPlaylistUseCase: CreatePlaylistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const createPlaylistBodySchema = z.object({
      title: z.string().max(200),
      user_id: z.string().uuid(), // trocar quando tivermos autenticação
    });
    const body = createPlaylistBodySchema.parse(request.body);

    const playlist = await this.createPlaylistUseCase.execute(body);

    return response.status(201).json(playlist);
  }
}
