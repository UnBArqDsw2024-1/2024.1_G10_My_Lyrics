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

const searchAnyController = new SearchAnyControllerFactory().createController();
export const usersRoutes = Router();

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
