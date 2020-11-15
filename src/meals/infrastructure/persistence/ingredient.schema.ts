import { Schema } from 'mongoose';

export const IngredientSchema = new Schema({
  _id: {
    type: String,
    alias: 'id'
  },
  title: {
    type: String,
    alias: '_title'
  },
});
