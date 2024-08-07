import { Router } from "express";
import { CreateMusicControllerFactory } from "../../../factories/CreateMusicFactory";
import { GetMusicControllerFactory } from "../../../factories/GetMusicFactory";
import { SearchMusicControllerFactory } from "../../../factories/SearchMusicFactory";
import { ListTopMusicsControllerFactory } from "../../../factories/ListTopMusicsFactory";

const createMusicController =
  new CreateMusicControllerFactory().createController();
const getMusicController =
  new GetMusicControllerFactory().createController();
const SearchMusicController = 
  new SearchMusicControllerFactory().createController();
const listTopMusicsController =
  new ListTopMusicsControllerFactory().createController();

export const musicsRoutes = Router();

musicsRoutes.post("/", (req, res) => createMusicController.handler(req, res));
musicsRoutes.get("/:id", (req, res) => getMusicController.handler(req, res));
musicsRoutes.get("/hotspot", (req, res) =>
  listTopMusicsController.handler(req, res),
);
