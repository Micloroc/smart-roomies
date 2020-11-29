import {CreateIngredient} from "../../../domain/commands/create-ingredient.command";
import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {BadRequestException, ConflictException, Injectable} from "@nestjs/common";
import {Ingredient} from "../../../domain/models/ingredient.entity";
import {IngredientRepository} from "../../../domain/repositories/ingredient.repository";
import {UserRepository} from "../../../../user/domain/repositories/user.repository";
import {HomeRepository} from "../../../../home/domain/repositories/home.repository";
import {IngredientAlreadyExists} from '../../../domain/exceptions/ingredient-already-exists.exception';
import {HomeNotFound} from '../../../../home/domain/exceptions/home-not-found.exception';

@Injectable()
@CommandHandler(CreateIngredient)
export class CreateIngredientHandler implements ICommandHandler<CreateIngredient> {

    constructor(private ingredientRepository: IngredientRepository,
                private userRepository: UserRepository,
                private publisher: EventPublisher,
                private homeRepository: HomeRepository) {
    }

    async execute(command: CreateIngredient) {
        let ingredient = await this.ingredientRepository.findById(command.id);
        if (ingredient) throw new IngredientAlreadyExists();

        const home = await this.homeRepository.findById(command.homeId);
        if (!home) throw new HomeNotFound();

        ingredient = Ingredient.create(command);
        await this.ingredientRepository.save(ingredient);

        ingredient = this.publisher.mergeObjectContext(ingredient);
        ingredient.commit();
    }
}