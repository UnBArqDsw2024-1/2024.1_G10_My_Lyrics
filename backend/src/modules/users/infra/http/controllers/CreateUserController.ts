import type { Request, Response } from "express";
import { CreateUserControllerFactory } from "./factories/CreateUserControllerFactory";
import { z } from "zod";

export class CreateUserController {
	async handler(request: Request, response: Response): Promise<Response> {
		const createUserSchema = z.object({
			name: z.string().max(200),
			email: z.string().email(),
		});
		const body = createUserSchema.parse(request.body);

		const user = await CreateUserControllerFactory().execute(body);

		return response.status(201).json(user);
	}
}
