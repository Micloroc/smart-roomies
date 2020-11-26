import {Schema} from 'mongoose';

export const MealStatusSchema = new Schema({
    status: {
        type: String,
        alias: '_status'
    },
}, {_id: false});
