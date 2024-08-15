import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";
import { LikeArtistControllerFactory } from "../../../factories/LikeArtistFactory";
import { SearchArtistControllerFactory } from "../../../factories/SearchArtistFactory";
import { SearchByIdControllerFactory } from "../../../factories/SearchByIdFactory";
import { UnlikeArtistControllerFactory } from "../../../factories/UnlikeArtistFactory";

export const artistRoutes = Router();
const likeArtistController =
  new LikeArtistControllerFactory().createController();
const unlikeArtistController =
  new UnlikeArtistControllerFactory().createController();
const searchArtistController =
  new SearchArtistControllerFactory().createController();
const searchByIdController =
  new SearchByIdControllerFactory().createController();

const authorization = new VerifyJwt();
const authorizationNotRequired = new VerifyJwt(false);
function notRequiredMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  authorizationNotRequired.verify(req, res, next);
}

artistRoutes.get("/search", (req, res) =>
  searchArtistController.handler(req, res),
);

artistRoutes.get("/search-by-id", notRequiredMiddleware, (req, res) =>
  searchByIdController.handler(req, res),
);

// Rotas autenticadas
artistRoutes.use((req, res, next) => authorization.verify(req, res, next));

artistRoutes.patch("/like/:artist_id", (req, res) =>
  likeArtistController.handler(req, res),
);

artistRoutes.patch("/unlike/:artist_id", (req, res) =>
  unlikeArtistController.handler(req, res),
);
