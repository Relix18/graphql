import { Todo } from "../models/dataModal.js";
import ErrorHandler from "../utils/errorHandler.js";

type ITodo = {
  title: string;
  description: string;
  user: string;
};

export const createTodo = async (
  _: any,
  { title, description, user }: ITodo
) => {
  try {
    return await Todo.create({ title, description, user });
  } catch (error: any) {
    return new ErrorHandler(400, error.message);
  }
};

export const getTodos = async (id: string) => {
  try {
    const todos = await Todo.find({ user: id });
    return todos;
  } catch (error: any) {
    return new ErrorHandler(400, error.message);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await Todo.findByIdAndDelete(id);
    return "Deleted successfully";
  } catch (error: any) {
    return new ErrorHandler(400, error.message);
  }
};
