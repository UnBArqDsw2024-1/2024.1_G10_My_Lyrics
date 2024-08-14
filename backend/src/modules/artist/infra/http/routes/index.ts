import { Router } from "express";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";
import { LikeArtistControllerFactory } from "../../../factories/LikeArtistFactory";
import { SearchArtistControllerFactory } from "../../../factories/SearchArtistFactory";
import { UnlikeArtistControllerFactory } from "../../../factories/UnlikeArtistFactory";

export const artistRoutes = Router();
const likeArtistController =
  new LikeArtistControllerFactory().createController();
const unlikeArtistController =
  new UnlikeArtistControllerFactory().createController();
const searchArtistController =
  new SearchArtistControllerFactory().createController();

const authorization = new VerifyJwt();

artistRoutes.get("/search", (req, res) =>
  searchArtistController.handler(req, res),
);

// Rotas autenticadas
artistRoutes.use((req, res, next) => authorization.verify(req, res, next));

artistRoutes.patch("/like/:artist_id", (req, res) =>
  likeArtistController.handler(req, res),
);

artistRoutes.patch("/unlike/:artist_id", (req, res) =>
  unlikeArtistController.handler(req, res),
);
