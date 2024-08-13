import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchArtistUseCase } from "../../../useCases/SearchArtistUseCase";

export class SearchArtistController implements IController {
    constructor(private searchArtistUseCase: SearchArtistUseCase) {}

    async handler(request: Request, response: Response): Promise<Response> {
        const searchArtistQuerySchema = z.object({
            name: z.string().max(200).min(1),
        });
        const query = searchArtistQuerySchema.parse(request.query);

        const artists = await this.searchArtistUseCase.execute(query);

        return response.status(200).json(artists);
    }
        
}