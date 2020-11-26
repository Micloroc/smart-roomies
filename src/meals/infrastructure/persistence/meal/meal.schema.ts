import {Schema} from 'mongoose';
import {MealStatusSchema} from "./meal-status.schema";
import {MealIngredientSchema} from "./meal-ingredient.schema";

export const MealSchema = new Schema({
    _id: {
        type: String,
        alias: 'id'
    },
    homeId: {
        type: String,
        alias: '_homeId'
    },
    creatorId: {
        type: String,
        alias: '_creatorId'
    },
    title: {
        type: String,
        alias: '_title'
    },
    description: {
        type: String,
        alias: '_description'
    },
    status: {
        type: MealStatusSchema,
        alias: '_status'
    },
    createdAt: {
        type: Date,
        alias: '_createdAt'
    },
    ingredients: {
        type: [MealIngredientSchema],
        alias: '_ingredients'
    }
});
