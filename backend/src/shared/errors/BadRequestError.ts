import { AppError } from "./interface/AppError";

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
