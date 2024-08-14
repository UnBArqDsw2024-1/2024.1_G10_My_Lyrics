import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchByArtistMusicUseCase } from "../../../useCases/SearchByArtistMusicUseCase";

export class SearchByArtistMusicController implements IController {
	constructor(private searchByArtistMusicUseCase: SearchByArtistMusicUseCase) {}

	public async handler(
		request: Request,
		response: Response,
	): Promise<Response> {
		const paramsSchema = z.object({
			artistId: z.string(),
		});

		const { artistId } = paramsSchema.parse(request.query);

		const musics = await this.searchByArtistMusicUseCase.execute({ artistId });

		return response.status(200).json(musics);
	}
}
