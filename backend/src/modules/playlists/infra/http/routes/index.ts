import { Router } from "express";
import { CreatePlaylistControllerFactory } from "../../../factories/CreatePlaylistFactory";
import { DeletePlaylistControllerFactory } from "../../../factories/DeletePlaylistFactory";
import { SearchPlaylistControllerFactory } from "../../../factories/SearchPlaylistFactory";

export const playlistRoutes = Router();

const createPlaylistController =
  new CreatePlaylistControllerFactory().createController();

const searchPlaylistController =
  new SearchPlaylistControllerFactory().createController();

const deletePlaylistController =
  new DeletePlaylistControllerFactory().createController();

playlistRoutes.post("/", (req, res) =>
  createPlaylistController.handler(req, res),
);
playlistRoutes.get("/search", (req, res) =>
  searchPlaylistController.handler(req, res),
);

playlistRoutes.delete("/:id", (req, res) =>
  deletePlaylistController.handler(req, res),
);
