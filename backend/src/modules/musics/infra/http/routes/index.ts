import { Router } from "express";
import { CreateMusicControllerFactory } from "../../../factories/CreateMusicFactory";

const createMusicController =
  new CreateMusicControllerFactory().createController();

export const musicsRoutes = Router();

musicsRoutes.post("/", (req, res) => createMusicController.handler(req, res));
