import type { Request, Response } from "express";
import { GetUserControllerFactory } from "./factories/CreateUserControllerFactory copy";

export class GetUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const user = await GetUserControllerFactory().execute({
      name,
    });

    return response.json(user);
  }
}
