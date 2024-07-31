import type { Request, Response } from "express";
import { z } from "zod";
import { CreateUserControllerFactory } from "./factories/CreateUserControllerFactory";

export class CreateUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const createUserSchema = z.object({
      name: z.string().max(200),
      email: z.string().email(),
      password: z.string().min(6),
      confirmedPassword: z.string().min(6),
    });
    const body = createUserSchema.parse(request.body);

    const user = await CreateUserControllerFactory().execute(body);

    return response.status(201).json(user);
  }
}
