import {Ingredient} from '../models/ingredient.entity';

export abstract class IngredientRepository {
    abstract async findById(id: string): Promise<Ingredient>;

    abstract async findAll(): Promise<Ingredient[]>;
    abstract async save(ingredient: Ingredient): Promise<Ingredient>;
}
