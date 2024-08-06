import { Router } from "express";
import { CreateMusicControllerFactory } from "../../../factories/CreateMusicFactory";
import { SearchMusicControllerFactory } from "../../../factories/SearchMusicFactory";

const createMusicController =
  new CreateMusicControllerFactory().createController();

const SearchMusicController = 
  new SearchMusicControllerFactory().createController();

export const musicsRoutes = Router();

musicsRoutes.post("/", (req, res) => createMusicController.handler(req, res));
