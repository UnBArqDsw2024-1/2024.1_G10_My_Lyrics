import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { ListTopMusicsUseCase } from "../../../useCases/ListTopMusicsUseCase";

export class ListTopMusicsController implements IController {
  constructor(private listTopMusicsUseCase: ListTopMusicsUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const listTopMusicsSchema = z.object({
      number: z.coerce.number(),
      dataInit: z.coerce.date(),
      dataFinished: z.coerce.date(),
    });
    const query = listTopMusicsSchema.parse(request.query);

    const musics = await this.listTopMusicsUseCase.execute(query);

    return response.json(musics);
  }
}
