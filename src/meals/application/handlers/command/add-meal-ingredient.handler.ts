import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {Injectable} from "@nestjs/common";
import {AddMealIngredient} from "../../../domain/commands/add-meal-ingredient.command";
import {MealRepository} from "../../../domain/repositories/meal.repository";
import {IngredientRepository} from "../../../domain/repositories/ingredient.repository";
import {MealNotFound} from "../../../domain/exceptions/meal-not-found.exception";
import {IngredientNotFound} from "../../../domain/exceptions/ingredient-not-found.exception";
import {plainToClass} from "class-transformer";
import {Meal} from "../../../domain/models/meal.entity";
import {MealDocument} from "../../../infrastructure/persistence/meal/meal.document";
import {Model} from "mongoose";

@Injectable()
@CommandHandler(AddMealIngredient)
export class AddMealIngredientHandler implements ICommandHandler<AddMealIngredient> {

    constructor(private mealRepository: MealRepository,
                private ingredientRepository: IngredientRepository,
                private publisher: EventPublisher) {
    }

    async execute(command: AddMealIngredient) {
        let meal = await this.mealRepository.findById(command.mealId);
        console.log(meal);
        if (!meal) throw new MealNotFound();

        const ingredient = await this.ingredientRepository.findById(command.ingredientId);
        if (!ingredient) throw new IngredientNotFound();
        meal.addMealIngredient(command);
        meal = this.publisher.mergeObjectContext(meal);
        meal.commit();
    }
}