import { getAllUsers, getUser, logIn, register, } from "../../controllers/userController.js";
import { createTodo, deleteTodo, getTodos, } from "../../controllers/dataController.js";
export const resolver = {
    Query: {
        users: getAllUsers,
        user: (_, args) => getUser(args.id),
        getTodos: (_, args) => getTodos(args.id),
        deleteTodo: (_, args) => deleteTodo(args.id),
    },
    Todo: {
        user: async (todo) => {
            console.log(todo.user);
            return await getUser(todo.user);
        },
    },
    Mutation: {
        logIn,
        register,
        createTodo,
    },
};
