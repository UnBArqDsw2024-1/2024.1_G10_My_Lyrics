import type { Request, Response } from "express";
import { z } from "zod";
import { IController } from "../../../../../shared/patterns/Controller/IController";
import { FollowingUserUseCase } from "../../../useCases/FollowingUserUseCase";

export class FollowingUserController implements IController {
  constructor(private followingUserUseCase: FollowingUserUseCase) {}

  async handler (request: Request, response: Response): Promise<Response> {
    const followingUserSchema = z.object({
      user_id: z.string().uuid(),
      following_id: z.string().uuid(),
    });

    const user_id = request.user!;
    const body = followingUserSchema.parse({
      user_id,
      following_id: request.params.user_id,
    });

    await this.followingUserUseCase.execute(body);
    return response.status(204).send();
  }
}