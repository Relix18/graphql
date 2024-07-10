import { Schema, model } from "mongoose";
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
export const Todo = model("Todo", todoSchema);
