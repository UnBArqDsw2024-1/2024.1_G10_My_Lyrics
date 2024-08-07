import { Router } from "express";
import { CreateMusicControllerFactory } from "../../../factories/CreateMusicFactory";
import { ListTopMusicsControllerFactory } from "../../../factories/ListTopMusicsFactory";

const createMusicController =
  new CreateMusicControllerFactory().createController();

export const musicsRoutes = Router();

musicsRoutes.post("/", (req, res) => createMusicController.handler(req, res));

const listTopMusicsController =
  new ListTopMusicsControllerFactory().createController();

musicsRoutes.get("/hotspot", (req, res) =>
  listTopMusicsController.handler(req, res),
);
