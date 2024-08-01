import type { Request, Response } from "express";

export interface IController {
  handler(request: Request, response: Response): Promise<Response>;
}
