import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchPlaylistUseCase } from "../../../useCases/SearchPlaylistUseCase";

export class SearchPlaylistController implements IController {
  constructor(private searchPlaylistUseCase: SearchPlaylistUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const searchPlaylistQuerySchema = z.object({
      title: z.string().max(200).nonempty(),
    });

    try {
      const query = searchPlaylistQuerySchema.parse(request.query);
      const playlists = await this.searchPlaylistUseCase.execute(query);

      if (playlists.length === 0) {
        return response.status(404).json({ message: "Playlist not found" });
      }

      return response.status(200).json(playlists);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response
          .status(400)
          .json({ message: "Invalid query parameters", errors: error.errors });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
