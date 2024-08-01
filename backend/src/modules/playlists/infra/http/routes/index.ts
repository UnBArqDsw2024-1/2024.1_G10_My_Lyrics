import { Router } from "express";

import { CreatePlaylistController } from "../controllers/CreatePlaylistController";

export const playlistRoutes = Router();

const createPlaylistController = new CreatePlaylistController();

playlistRoutes.post("/", createPlaylistController.handler);
