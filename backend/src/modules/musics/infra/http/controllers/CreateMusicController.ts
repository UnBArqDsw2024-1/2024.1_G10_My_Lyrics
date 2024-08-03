import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { CreateMusicUseCase } from "../../../useCases/CreateMusicUseCase";

export class CreateMusicController implements IController {
  constructor(private createMusicUseCase: CreateMusicUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const createMusicSchema = z.object({
      albumId: z.string().uuid(),
      title: z.string(),
      youtubeUrl: z.string().url(),
      iconUrl: z.string().url(),
      verses: z.array(
        z.object({
          text: z.string(),
          startTime: z.number().int(),
          endTime: z.number().int(),
          translatedText: z.string().optional(),
        }),
      ),
    });

    const body = createMusicSchema.parse(request.body);

    const music = await this.createMusicUseCase.execute(body);

    return response.status(201).json(music);
  }
}
