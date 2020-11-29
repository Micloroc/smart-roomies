import {MealIngredient} from "../models/meal-ingredient.entity";
import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateMeal {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;
    @IsUUID(4)
    @IsNotEmpty()
    creatorId: string;
    @IsUUID(4)
    @IsNotEmpty()
    homeId: string;
    @IsNotEmpty()
    title: string;
    description: string;
    ingredients: MealIngredient[];
}
