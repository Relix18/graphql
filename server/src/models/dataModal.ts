import { Schema, model } from "mongoose";

interface ITodo extends Document {
  _id: string;
  title: string;
  description: string;
  user: string;
}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export const Todo = model<ITodo>("Todo", todoSchema);
