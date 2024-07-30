import { AppError } from "./interface/AppError";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}
