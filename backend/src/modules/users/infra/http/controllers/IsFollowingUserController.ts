import type { Request, Response } from "express";
import { z } from "zod";
import { IController } from "../../../../../shared/patterns/Controller/IController";
import { IsFollowingUserUseCase } from "../../../useCases/IsFollowingUserUseCase";

export class IsFollowingUserController implements IController {
  constructor(private isFollowingUserUseCase: IsFollowingUserUseCase) {}

  async handler (request: Request, response: Response): Promise<Response> {
    const IsFollowingUserSchema = z.object({
      user_id: z.string().uuid(),
      following_id: z.string().uuid(),
    });

    const user_id = request.user!;
    const body = IsFollowingUserSchema.parse({
      user_id,
      IsFollowing_id: request.params.user_id,
    });

    await this.isFollowingUserUseCase.execute(body);
    return response.status(204).send();
  }
}