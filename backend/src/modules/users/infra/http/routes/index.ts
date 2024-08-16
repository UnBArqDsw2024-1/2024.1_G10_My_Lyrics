import express, { Router } from "express";
import { multerConfig } from "../../../../../config/multerConfig";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";
import { multerClient } from "../../../../../shared/multer/multerClient";
import { AuthenticateUserControllerFactory } from "../../../factories/AuthenticateUserFactory";
import { CreateUserControllerFactory } from "../../../factories/CreateUserFactory";
import { DeleteUserControllerFactory } from "../../../factories/DeleteUserFactory";
import { GetUserByIdControllerFactory } from "../../../factories/GetUserByIdFactory";
import { GetUserControllerFactory } from "../../../factories/GetUserFactory";
import { SearchAnyControllerFactory } from "../../../factories/SearchAnyFactory";
import { UpdateUserControllerFactory } from "../../../factories/UpdateUserFactory";
import { UpdateUserIconControllerFactory } from "../../../factories/UpdateUserIconFactory";
import { FollowingUserControllerFactory } from "../../../factories/FollowingUserFactory";
import { IsFollowingUserControllerFactory } from "../../../factories/IsFollowingUserFactory";

const authorization = new VerifyJwt();

const createUserController =
  new CreateUserControllerFactory().createController();
const getUserController = new GetUserControllerFactory().createController();
const getUserByIdController =
  new GetUserByIdControllerFactory().createController();
const deleteUserController =
  new DeleteUserControllerFactory().createController();
const authenticateUserController =
  new AuthenticateUserControllerFactory().createController();
const updateUserController =
  new UpdateUserControllerFactory().createController();
const updateUserIconController =
  new UpdateUserIconControllerFactory().createController();

const followingUserController =
  new FollowingUserControllerFactory().createController();

const searchAnyController = new SearchAnyControllerFactory().createController();
export const usersRoutes = Router();

const isFollowingUserController = new IsFollowingUserControllerFactory().createController();

usersRoutes.post("/", (req, res) => createUserController.handler(req, res));
usersRoutes.post("/login", (req, res) =>
  authenticateUserController.handler(req, res),
);

usersRoutes.get("/byId/:user_id", (req, res) =>
  getUserByIdController.handler(req, res),
);

usersRoutes.get("/searchAny", (req, res) =>
  searchAnyController.handler(req, res),
);

usersRoutes.use("/avatar", express.static(multerConfig.storagePath));
// Rotas autenticadas
usersRoutes.use((req, res, next) => authorization.verify(req, res, next));

usersRoutes.get("/", (req, res) => getUserController.handler(req, res));

usersRoutes.delete("/", (req, res) => deleteUserController.handler(req, res));

usersRoutes.patch("/", (req, res) => updateUserController.handler(req, res));

usersRoutes.patch("/avatar", multerClient.single("image"), (req, res) =>
  updateUserIconController.handler(req, res),
);
usersRoutes.patch("/like/:user_id", (req, res) => followingUserController.handler(req, res));

usersRoutes.get("/isFollowing/:user_id", (req, res) => isFollowingUserController.handler(req, res));

