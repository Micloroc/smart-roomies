import {IsNotEmpty, IsUUID} from "class-validator";
import {IngredientUnit} from "../models/ingredient-unit";

export class AddMealIngredient {
    @IsUUID(4)
    @IsNotEmpty()
    public readonly mealId: string;
    @IsUUID(4)
    @IsNotEmpty()
    public readonly mealIngredientId: string;
    @IsUUID(4)
    @IsNotEmpty()
    public readonly ingredientId: string;
    @IsNotEmpty()
    public readonly amount: number;
    @IsNotEmpty()
    public readonly ingredientUnit: IngredientUnit;
}