import type { Request, Response } from "express";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { GetMusicUseCase } from "../../../useCases/GetMusicUseCase";

export class GetMusicController implements IController {
  constructor(private getMusicUseCase: GetMusicUseCase) {}

  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const id = request.params.id;

    const music = await this.getMusicUseCase.execute({ id, ip: request.ip! });

    return response.status(200).json(music);
  }
}
