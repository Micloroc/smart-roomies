import {Document} from 'mongoose';
import {Ingredient} from "../../domain/models/ingredient.entity";

export type IngredientDocument = Ingredient & Document;