import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { ZodError } from "zod";
import { env } from "../../config/env";
import { musicsRoutes } from "../../modules/musics/infra/http/routes";
import { playlistRoutes } from "../../modules/playlists/infra/http/routes";
import { usersRoutes } from "../../modules/users/infra/http/routes";
import { AppError } from "../../shared/errors/interface/AppError";


export const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", usersRoutes);
app.use("/playlist", playlistRoutes);
app.use("/music", musicsRoutes);

app.get("/health-checks", (_req, res) => {
  return res.json({
    message: "Server is healthy and running",
  });
});

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: "Validation Error",
      issues: error.flatten().fieldErrors,
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).send({
      message: error.message,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Should log to external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ error: "Internal Server Error" });
});
