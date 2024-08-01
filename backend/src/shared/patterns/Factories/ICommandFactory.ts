import type { ICommand } from "../Command/ICommand";

export interface ICommandFactory {
  createCommand(): ICommand<unknown, unknown>;
}
