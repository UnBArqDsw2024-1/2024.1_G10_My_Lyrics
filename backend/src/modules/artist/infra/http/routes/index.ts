import { Router } from "express";
import { LikeArtistControllerFactory } from "../../../factories/LikeArtistFactory";
import { UnlikeArtistControllerFactory } from "../../../factories/UnlikeArtistFactory";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";

export const artistRoutes = Router();
const likeArtistController =  new LikeArtistControllerFactory().createController();
const unlikeArtistController = new UnlikeArtistControllerFactory().createController();


const authorization = new VerifyJwt();

// Rotas autenticadas
artistRoutes.use((req, res, next) => authorization.verify(req, res, next));
artistRoutes.patch("/like", (req, res) =>
  likeArtistController.handler(req, res));
  
artistRoutes.patch("/unlike", (req, res) => 
  unlikeArtistController.handler(req, res)
);