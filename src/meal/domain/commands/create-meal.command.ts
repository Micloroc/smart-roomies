import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { CreateMealIngredient } from './create-meal-ingredient.command';

export class CreateMeal {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
  @IsUUID(4)
  @IsNotEmpty()
  creatorId: string;
  @IsNotEmpty()
  title: string;
  description: string;
  @IsArray()
  createMealIngredients: CreateMealIngredient[];
}
