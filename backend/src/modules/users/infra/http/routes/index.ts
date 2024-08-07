import { Router } from "express";
import { AuthenticateUserControllerFactory } from "../../../factories/AuthenticateUserFactory";
import { CreateUserControllerFactory } from "../../../factories/CreateUserFactory";
import { DeleteUserControllerFactory } from "../../../factories/DeleteUserFactory";
import { GetUserControllerFactory } from "../../../factories/GetUserFactory";
import { UpdateUserControllerFactory } from "../../../factories/UpdateUserFactory";
import { VerifyJwt } from "../../../../../shared/middlewares/VerifyJWT";

const authorization = new VerifyJwt();

const createUserController = new CreateUserControllerFactory().createController();
const getUserController = new GetUserControllerFactory().createController();
const deleteUserController = new DeleteUserControllerFactory().createController();
const authenticateUserController = new AuthenticateUserControllerFactory().createController();
const updateUserController = new UpdateUserControllerFactory().createController();

export const usersRoutes = Router();

usersRoutes.post("/", (req, res) => createUserController.handler(req, res));
usersRoutes.post("/login", (req, res) => authenticateUserController.handler(req, res));

// Rotas autenticadas
usersRoutes.use((req, res, next) => authorization.verify(req, res, next));

usersRoutes.get("/", (req, res) => getUserController.handler(req, res));
usersRoutes.delete("/", (req, res) => deleteUserController.handler(req, res));
usersRoutes.patch("/", (req, res) => updateUserController.handler(req, res));
