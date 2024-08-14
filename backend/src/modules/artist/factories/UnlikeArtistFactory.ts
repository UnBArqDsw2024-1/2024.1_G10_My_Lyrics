import type { IController } from "../../../shared/patterns/Controller/IController";
import type { ICommandFactory } from "../../../shared/patterns/Factories/ICommandFactory";
import type { IControllerFactory } from "../../../shared/patterns/Factories/IControllerFactory";
import { ArtistRepository } from "../infra/database/repositories/ArtistRepository";
import { UnlikeArtistController } from "../infra/http/controllers/UnlikeArtistController";
import { UnlikeArtistUseCase } from "../useCases/UnilikeArtistUseCase";

export class UnlikeArtistUseCaseFactory implements ICommandFactory {
	createCommand() {
		return new UnlikeArtistUseCase(ArtistRepository.getInstance());
	}
}

export class UnlikeArtistControllerFactory implements IControllerFactory {
	createController(): IController {
		return new UnlikeArtistController(
			new UnlikeArtistUseCaseFactory().createCommand(),
		);
	}
}
