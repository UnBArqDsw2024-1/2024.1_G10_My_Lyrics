import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchPlaylistUseCase } from "../../../useCases/SearchPlaylistUseCase";

export class SearchPlaylistController implements IController {
  constructor(private searchPlaylistUseCase: SearchPlaylistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const searchPlaylistQuerySchema = z.object({
      title: z.string().max(200).min(1),
    });
    const query = searchPlaylistQuerySchema.parse(request.query);

    const playlists = await this.searchPlaylistUseCase.execute(query);

    return response.status(200).json(playlists);
  }
}
