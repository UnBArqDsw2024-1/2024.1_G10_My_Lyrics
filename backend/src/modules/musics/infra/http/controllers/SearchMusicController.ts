import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchMusicUseCase } from "../../../useCases/SearchMusicUseCase";

export class SearchMusicController implements IController {
  constructor(private searchMusicUseCase: SearchMusicUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const searchMusicQuerySchema = z.object({
      title: z.string().max(200).min(1),
    });
    const query = searchMusicQuerySchema.parse(request.query);

    const musics = await this.searchMusicUseCase.execute(query);

    return response.status(200).json(musics);
  }
}
