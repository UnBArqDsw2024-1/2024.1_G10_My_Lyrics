import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchByIdUseCase } from "../../../useCases/SearchByIdUseCase";

export class SearchByIdController implements IController {
	constructor(private searchByIdUseCase: SearchByIdUseCase) {}

	async handler(request: Request, response: Response): Promise<Response> {
		const searchArtistQuerySchema = z.object({
			artist_id: z.string().max(200).min(1),
		});
		const query = searchArtistQuerySchema.parse(request.query);

		const artists = await this.searchByIdUseCase.execute(query);

		return response.status(200).json(artists);
	}
}
