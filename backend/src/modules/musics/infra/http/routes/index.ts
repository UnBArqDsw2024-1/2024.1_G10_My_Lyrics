import { Router } from "express";
import { CreateMusicControllerFactory } from "../../../factories/CreateMusicFactory";
import { GetMusicControllerFactory } from "../../../factories/GetMusicFactory";

const createMusicController =
  new CreateMusicControllerFactory().createController();

const getMusicController =
  new GetMusicControllerFactory().createController();

export const musicsRoutes = Router();

musicsRoutes.post("/", (req, res) => createMusicController.handler(req, res));
musicsRoutes.get("/:id", (req, res) => getMusicController.handler(req, res));
