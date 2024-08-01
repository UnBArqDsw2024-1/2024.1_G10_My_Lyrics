import type { IController } from "../Controller/IController";

export interface IControllerFactory {
  createController(): IController;
}
