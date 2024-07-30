import { AppError } from "./interface/AppError";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
