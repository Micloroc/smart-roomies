import { Schema } from 'mongoose';

export const HomeSchema = new Schema({
  _id: {
    type: String,
    alias: 'id'
  },
  firstName: {
    type: String,
    alias: '_firstName'
  },
  lastName: {
    type: String,
    alias: '_lastName'
  },
  password: {
    type: String,
    alias: '_password'
  },
  email: {
    type: String,
    alias: '_email'
  }
});
