import type { Request, Response } from "express";
import { z } from "zod";
import type { ICommand } from "../../../../../shared/patterns/Command/ICommand";
import type { GetPlaylistUseCase } from "../../../useCases/GetPlaylistUseCase";


export class GetPlaylistController implements ICommand<Request, Response> {
  constructor(private GetPlaylistUseCase: GetPlaylistUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const getPlaylistSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const params = getPlaylistSchema.parse(request.params);
      const playlist = await this.GetPlaylistUseCase.execute(params);
      return response.status(200).json(playlist);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: error.errors });
      }
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async handler(request: Request, response: Response): Promise<Response> {
    return this.execute(request, response);
  }
}
