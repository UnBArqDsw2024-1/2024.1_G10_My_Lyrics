import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { GetUserController } from "../controllers/GetUserController";

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

export const usersRoutes = Router();

usersRoutes.post("/", createUserController.handler);
usersRoutes.get("/:name", getUserController.handler);