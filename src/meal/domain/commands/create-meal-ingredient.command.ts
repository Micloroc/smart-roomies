import { IsNotEmpty, IsUUID } from 'class-validator';
import { Unit } from '../../../common/domain/model/unit';

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
  title: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  unit: Unit;
}
