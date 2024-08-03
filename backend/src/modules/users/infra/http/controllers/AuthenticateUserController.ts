import type { Request, Response } from "express";
import { z } from "zod";
import { AuthenticateUserUseCase } from "../../../useCases/AuthenticateUserUseCase";

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

  async handler(request: Request, response: Response): Promise<Response> {
    const authenticateUserSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const body = authenticateUserSchema.parse(request.body);

    const user = await this.authenticateUserUseCase.execute(body);

    return response.status(200).json(user);
  }
}
