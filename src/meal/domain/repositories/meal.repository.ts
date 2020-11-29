import {Meal} from "../models/meal.entity";

export abstract class MealRepository {
    abstract async findById(id: string): Promise<Meal>;
    abstract async findAll(): Promise<Meal[]>;
    abstract async save(meal: Meal): Promise<Meal>;
}
