import type { Request, Response } from "express";
import { z } from "zod";
import type { IController } from "../../../../../shared/patterns/Controller/IController";
import type { AuthenticateUserUseCase } from "../../../useCases/AuthenticateUserUseCase";

export class AuthenticateUserController implements IController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handler(request: Request, response: Response): Promise<Response> {
    const authenticateUserSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const body = authenticateUserSchema.parse(request.body);

    const userWithAuth = await this.authenticateUserUseCase.execute(body);

    const thirtyDaysAfter = new Date();
    thirtyDaysAfter.setDate(thirtyDaysAfter.getDate() + 30);
    return response
      .cookie("CU-QUE-FODAO", userWithAuth.auth, {
        expires: thirtyDaysAfter,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .status(200)
      .json(userWithAuth);
  }
}
