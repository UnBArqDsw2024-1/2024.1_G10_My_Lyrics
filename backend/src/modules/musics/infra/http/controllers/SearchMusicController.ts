import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchMusicUseCase } from "../../../useCases/SearchMusicUseCase";
import type { Request, Response } from "express";
import { z } from "zod";

export class SearchMusicController implements IController {
    constructor(private searchMusicUseCase: SearchMusicUseCase) {}

    async handler(request: Request, response: Response): Promise<Response> {
        const searchMusicQuerySchema = z.object({
            title: z.string().max(200).nonempty(),
        });

        try {
            const query = searchMusicQuerySchema.parse(request.query);
            const musics = await this.searchMusicUseCase.execute(query);

            if(musics.length === 0) {
                return response.status(404).json({ message: "Music not found" });
            }

            return response.status(200).json(musics);
        } catch(error) {
            if(error instanceof z.ZodError) {
                return response
                    .status(400)
                    .json({ message: "invalid query parameters", errors: error.errors });
            }
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}