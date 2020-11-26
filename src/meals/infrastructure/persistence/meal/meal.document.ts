import {Document} from 'mongoose';
import {Meal} from "../../../domain/models/meal.entity";

export type MealDocument = Meal & Document;