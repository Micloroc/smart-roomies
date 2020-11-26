import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {BadRequestException, ConflictException, Injectable} from "@nestjs/common";
import {Ingredient} from "../../../domain/models/ingredient.entity";
import {AddMealIngredient} from "../../../domain/commands/add-meal-ingredient.command";
import {MealRepository} from "../../../domain/repositories/meal.repository";
import {IngredientRepository} from "../../../domain/repositories/ingredient.repository";
import {MealNotFound} from "../../../domain/exceptions/meal-not-found.exception";
import {IngredientNotFound} from "../../../domain/exceptions/ingredient-not-found.exception";
import {MealIngredientAlreadyExists} from "../../../domain/exceptions/meal-ingredient-already-exists.exception";

@Injectable()
@CommandHandler(AddMealIngredient)
export class AddMealIngredientHandler implements ICommandHandler<AddMealIngredient> {

    constructor(private mealRepository: MealRepository,
                private ingredientRepository: IngredientRepository,
                private publisher: EventPublisher) {
    }

    async execute(command: AddMealIngredient) {

        let meal = await this.mealRepository.findById(command.mealId);
        if (!meal) throw new MealNotFound();

        const ingredient = await this.ingredientRepository.findById(command.ingredientId);
        if (!ingredient) throw new IngredientNotFound();

        meal.addMealIngredient(command);
        meal = this.publisher.mergeObjectContext(meal);
        meal.commit();

    }
}