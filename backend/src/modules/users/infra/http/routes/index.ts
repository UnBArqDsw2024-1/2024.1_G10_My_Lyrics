import { Router } from "express";
import { AuthenticateUserControllerFactory } from "../../../factories/AuthenticateUserFactory";
import { CreateUserControllerFactory } from "../../../factories/CreateUserFactory";
import { DeleteUserControllerFactory } from "../../../factories/DeleteUserFactory";
import { GetUserControllerFactory } from "../../../factories/GetUserFactory";
import { UpdateUserControllerFactory } from "../../../factories/UpdateUserFactory";

const createUserController =
  new CreateUserControllerFactory().createController();

const getUserController = new GetUserControllerFactory().createController();

const deleteUserController =
  new DeleteUserControllerFactory().createController();

const authenticateUserController =
  new AuthenticateUserControllerFactory().createController();

const updateUserController =
  new UpdateUserControllerFactory().createController();

export const usersRoutes = Router();

usersRoutes.post("/", (req, res) => createUserController.handler(req, res));
usersRoutes.get("/:name", (req, res) => getUserController.handler(req, res));
usersRoutes.delete("/:id", (req, res) =>
  deleteUserController.handler(req, res),
);
usersRoutes.post("/login", (req, res) =>
  authenticateUserController.handler(req, res),
);
usersRoutes.patch("/:id", (req, res) =>
  updateUserController.handler(req, res),
);