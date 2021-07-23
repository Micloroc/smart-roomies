import { IsNotEmpty, IsUUID } from 'class-validator';
import { Unit } from '../../../common/domain/model/unit';
import { MealIngredient } from '../models/meal-ingredient.entity';

export class CreateMealIngredient {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
  @IsUUID(4)
  @IsNotEmpty()
  mealId: string;
  @IsNotEmpty()
  ingredientId: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  unit: Unit;
  @IsNotEmpty()
  name: string;
}

export const createMealIngredientFromEntity = (
  mealIngredient: MealIngredient,
): CreateMealIngredient => {
  return {
    id: mealIngredient.id,
    ingredientId: mealIngredient.ingredientId,
    mealId: mealIngredient.meal.id,
    unit: mealIngredient.unit,
    amount: mealIngredient.amount,
    name: mealIngredient.name,
  };
};
