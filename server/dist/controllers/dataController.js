import { Todo } from "../models/dataModal.js";
import ErrorHandler from "../utils/errorHandler.js";
export const createTodo = async (_, { title, description, user }) => {
    try {
        return await Todo.create({ title, description, user });
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
export const getTodos = async (id) => {
    try {
        const todos = await Todo.find({ user: id });
        return todos;
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
export const deleteTodo = async (id) => {
    try {
        await Todo.findByIdAndDelete(id);
        return "Deleted successfully";
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
