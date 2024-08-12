import { Router } from "express";
import { CreateMusicControllerFactory } from "../../../factories/CreateMusicFactory";
import { GetMusicControllerFactory } from "../../../factories/GetMusicFactory";
import { ListTopMusicsControllerFactory } from "../../../factories/ListTopMusicsFactory";
import { LikeMusicControllerFactory } from "../../../factories/LikeMusicFactory";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";
import { UnlikeMusicControllerFactory } from "../../../factories/UnlikeMusicFactory";

const createMusicController =
  new CreateMusicControllerFactory().createController();
const getMusicController = new GetMusicControllerFactory().createController();
const listTopMusicsController =
  new ListTopMusicsControllerFactory().createController();
const likeMusicController = new LikeMusicControllerFactory().createController();
const unlikeMusicController = new UnlikeMusicControllerFactory().createController();

export const musicsRoutes = Router();

musicsRoutes.post("/", (req, res) => createMusicController.handler(req, res));

musicsRoutes.get("/hotspot", (req, res) =>
  listTopMusicsController.handler(req, res),
);

musicsRoutes.get("/:id", (req, res) => getMusicController.handler(req, res));


const authorization = new VerifyJwt();

// Rotas autenticadas
musicsRoutes.use((req, res, next) => authorization.verify(req, res, next));
musicsRoutes.patch("/like", (req, res) =>
  likeMusicController.handler(req, res));
  
musicsRoutes.patch("/unlike", (req, res) => 
  unlikeMusicController.handler(req, res)
);
