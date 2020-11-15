import {MealIngredient} from "./meal-ingredient.entity";

export class Meal {
    public readonly id: string;
    private title: string;
    private description: string;
    private createdAt: Date;
    private status: string;
    private ingredients: MealIngredient[];
}