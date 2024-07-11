import { Todo } from "../models/dataModal.js";
import ErrorHandler from "../utils/errorHandler.js";
export const createTodo = async ({ title, description }, { user }) => {
    try {
        return await Todo.create({ title, description, user: user._id });
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
export const getTodos = async ({ user }) => {
    try {
        const todos = await Todo.find({ user: user._id });
        return todos;
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
export const deleteTodo = async (id) => {
    console.log(id);
    try {
        const data = await Todo.findByIdAndDelete(id);
        if (!data)
            return new ErrorHandler(404, "Todo not found");
        return { message: "Deleted successfully", id };
    }
    catch (error) {
        return new ErrorHandler(400, error.message);
    }
};
