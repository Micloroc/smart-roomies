import {CreateIngredient} from "../../../domain/commands/create-ingredient.command";
import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {BadRequestException, ConflictException, Injectable} from "@nestjs/common";
import {Ingredient} from "../../../domain/models/ingredient.entity";
import {IngredientRepository} from "../../../domain/repositories/ingredient.repository";
import {UserRepository} from "../../../../user/domain/repositories/user.repository";
import {HomeRepository} from "../../../../home/domain/repositories/home.repository";

@Injectable()
@CommandHandler(CreateIngredient)
export class CreateIngredientHandler implements ICommandHandler<CreateIngredient> {

    constructor(private ingredientRepository: IngredientRepository, private userRepository: UserRepository, private publisher: EventPublisher, private homeRepository: HomeRepository) {
    }

    async execute(command: CreateIngredient) {
        let ingredient = await this.ingredientRepository.findById(command.id);
        if (ingredient) throw new ConflictException();

        const home = await this.homeRepository.findById(command.homeId);
        if (!home) throw new BadRequestException();

        ingredient = new Ingredient(command);
        await this.ingredientRepository.save(ingredient);

        ingredient = this.publisher.mergeObjectContext(ingredient);
        ingredient.commit();
    }
}