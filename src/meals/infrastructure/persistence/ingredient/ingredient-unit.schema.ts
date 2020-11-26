import {Schema} from 'mongoose';

export const IngredientUnitSchema = new Schema({
    value: {
            type: String,
            alias: '_value',
    }
}, {_id: false});
