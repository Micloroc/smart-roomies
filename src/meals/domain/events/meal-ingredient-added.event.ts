import {AddMealIngredient} from "../commands/add-meal-ingredient.command";

export class MealIngredientAdded {
    public readonly occurredOn: Date;
    public readonly command: AddMealIngredient;

    constructor(command: AddMealIngredient) {
        this.command = command;
        this.occurredOn = new Date();
    }

}