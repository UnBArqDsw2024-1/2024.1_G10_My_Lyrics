import { Request, Response } from "express";
import { z } from "zod";
import { createPlaylistUseCaseFactory } from "../../../useCases/factories/CreatePlaylistUseCaseFactory";




export class CreatePlaylistController {

  async handler(request: Request, response: Response): Promise<Response> {
    const createPlaylistBodySchema = z.object({
      title: z.string().max(200),
      user_id: z.string().uuid(), // trocar quando tivermos autenticação
    });
    const body = createPlaylistBodySchema.parse(request.body);
  
    const createPlaylistUseCase = createPlaylistUseCaseFactory();
    const playlist = await createPlaylistUseCase.execute(body);
  
    return response.status(201).json(playlist);
  
  
  
  }
}