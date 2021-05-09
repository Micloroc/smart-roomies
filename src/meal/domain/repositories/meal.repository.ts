import { Meal } from '../models/meal.entity';

export abstract class MealRepository {
  abstract findById(id: string): Promise<Meal>;
  abstract findByHomeId(homeId: string): Promise<Meal[]>;
  abstract findByCreatorId(creatorId: string): Promise<Meal[]>;
  abstract findAll(): Promise<Meal[]>;
  abstract save(meal: Meal): Promise<Meal>;
}
