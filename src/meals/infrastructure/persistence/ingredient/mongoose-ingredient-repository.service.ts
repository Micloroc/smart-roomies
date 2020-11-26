import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {IngredientRepository} from "../../../domain/repositories/ingredient.repository";
import {IngredientDocument} from "./ingredient.document";
import {Ingredient} from "../../../domain/models/ingredient.entity";

@Injectable()
export class MongooseIngredientRepository implements IngredientRepository {
    constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>) {
    }

    async save(ingredient: Ingredient): Promise<Ingredient> {
        const createdIngredient = new this.ingredientModel(ingredient);
        return createdIngredient.save();
    }

    async findById(id: string): Promise<Ingredient> {
        return this.ingredientModel.findById(id).exec();
    }

    async findAll(): Promise<Ingredient[]> {
        return this.ingredientModel.find().exec();
    }
}
