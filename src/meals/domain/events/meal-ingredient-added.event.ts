import {AddMealIngredient} from "../commands/add-meal-ingredient.command";

export class MealIngredientAdded {
    public readonly occurredOn: Date;

    constructor(public readonly command: AddMealIngredient) {
        this.occurredOn = new Date();
    }

}