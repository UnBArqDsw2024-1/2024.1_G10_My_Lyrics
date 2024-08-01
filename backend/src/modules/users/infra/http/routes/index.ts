import { Router } from "express";
import { CreateUserControllerFactory } from "../../../factories/CreateUserFactory";
import { GetUserControllerFactory } from "../../../factories/GetUserFactory";

const createUserController =
  new CreateUserControllerFactory().createController();
const getUserController = new GetUserControllerFactory().createController();

export const usersRoutes = Router();

usersRoutes.post("/", (req, res) => createUserController.handler(req, res));
usersRoutes.get("/:name", (req, res) => getUserController.handler(req, res));
