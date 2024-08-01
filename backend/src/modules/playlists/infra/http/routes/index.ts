import { Router } from "express";
import { CreatePlaylistControllerFactory } from "../../../factories/CreatePlaylistFactory";

export const playlistRoutes = Router();

const createPlaylistController =
  new CreatePlaylistControllerFactory().createController();

playlistRoutes.post("/", (req, res) =>
  createPlaylistController.handler(req, res),
);
