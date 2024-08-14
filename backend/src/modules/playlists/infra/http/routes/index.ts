import { Router } from "express";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";
import { CreatePlaylistControllerFactory } from "../../../factories/CreatePlaylistFactory";
import { DeletePlaylistControllerFactory } from "../../../factories/DeletePlaylistFactory";
import { GetPlaylistControllerFactory } from "../../../factories/GetPlaylistFactory";
import { SearchPlaylistControllerFactory } from "../../../factories/SearchPlaylistFactory";
import { AddMusicControllerFactory } from "../../../factories/AddMusicFactory";

export const playlistRoutes = Router();

const createPlaylistController =
  new CreatePlaylistControllerFactory().createController();

const searchPlaylistController =
  new SearchPlaylistControllerFactory().createController();

const deletePlaylistController =
  new DeletePlaylistControllerFactory().createController();

const getPlaylistController =
  new GetPlaylistControllerFactory().createController();

const addMusicController =
  new AddMusicControllerFactory().createController();

playlistRoutes.get("/search", (req, res) =>
  searchPlaylistController.handler(req, res),
);

playlistRoutes.get("/:id", (req, res) =>
  getPlaylistController.handler(req, res),
);

const authorization = new VerifyJwt();

// Rotas autenticadas
playlistRoutes.use((req, res, next) => authorization.verify(req, res, next));

playlistRoutes.post("/", (req, res) =>
  createPlaylistController.handler(req, res),
);
playlistRoutes.delete("/:id", (req, res) =>
  deletePlaylistController.handler(req, res),
);

playlistRoutes.post("/:playlist_id/music", (req, res) =>
  addMusicController.handler(req, res),
);
