import { Ingredient } from '../models/ingredient.entity';

export abstract class IngredientRepository {
  abstract findById(id: string): Promise<Ingredient>;

  abstract findByCreatorId(id: string): Promise<Ingredient[]>;

  abstract findAll(): Promise<Ingredient[]>;

  abstract save(ingredient: Ingredient): Promise<Ingredient>;
}
