import { Router } from "express";

import { createPlaylistController } from "../controllers/CreatePlaylistController";

export const playlistRoutes = Router();

playlistRoutes.post("/", createPlaylistController);
