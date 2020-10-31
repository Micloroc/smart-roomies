import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: {
    type: String,
    alias: 'id'
  },
  firstName: String,
  lastName: String,
  password: String,
  email: String
});
