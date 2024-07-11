import { Request } from "express";
import { Todo } from "../models/dataModal.js";
import ErrorHandler from "../utils/errorHandler.js";
import { IUser } from "../models/userModel.js";

type ITodo = {
  title: string;
  description: string;
  user: string;
};

export const createTodo = async (
  { title, description }: ITodo,
  { user }: { user: IUser }
) => {
  try {
    return await Todo.create({ title, description, user: user._id });
  } catch (error: any) {
    return new ErrorHandler(400, error.message);
  }
};

export const getTodos = async ({ user }: { user: IUser }) => {
  try {
    const todos = await Todo.find({ user: user._id });
    return todos;
  } catch (error: any) {
    return new ErrorHandler(400, error.message);
  }
};

export const deleteTodo = async (id: string) => {
  console.log(id);
  try {
    const data = await Todo.findByIdAndDelete(id);

    if (!data) return new ErrorHandler(404, "Todo not found");
    return { message: "Deleted successfully", id };
  } catch (error: any) {
    return new ErrorHandler(400, error.message);
  }
};
