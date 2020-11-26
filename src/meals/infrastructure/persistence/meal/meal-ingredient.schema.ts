import {Schema} from 'mongoose';
import {IngredientUnitSchema} from "../ingredient/ingredient-unit.schema";

export const MealIngredientSchema = new Schema({
    _id: {
        type: String,
        alias: 'id'
    },
    ingredientId: {
        type: String,
        alias: '_ingredientId'
    },
    amount: {
        type: Number,
        alias: '_amount'
    },
    unit: {
        type: IngredientUnitSchema,
        alias: '_unit'
    }
});
