import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {MealRepository} from "../../../domain/repositories/meal.repository";
import {MealDocument} from "./meal.document";
import {Meal} from "../../../domain/models/meal.entity";

@Injectable()
export class MongooseMealRepository implements MealRepository {
    constructor(@InjectModel(Meal.name) private mealModel: Model<MealDocument>) {
    }

    async save(meal: Meal): Promise<Meal> {
        const createdMeal = new this.mealModel(meal);
        return createdMeal.save();
    }

    async findById(id: string): Promise<Meal> {
        return this.mealModel.findById(id).exec();
    }

    async findAll(): Promise<Meal[]> {
        return this.mealModel.find().exec();
    }
}
