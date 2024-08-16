import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { SearchAnyUseCase } from "../../../useCases/SearchAnyUseCase";

export class SearchAnyController implements IController {
  constructor(private searchAnyUseCase: SearchAnyUseCase) {}

  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const querySchema = z.object({
      text: z.string(),
    });
    const query = querySchema.parse(request.query);

    const res = await this.searchAnyUseCase.execute(query);

    return response.status(200).json(res);
  }
}
