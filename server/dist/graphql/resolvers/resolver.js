import { authUser, getAllUsers, getUser, logIn, } from "../../controllers/userController.js";
import { createTodo, deleteTodo, getTodos, } from "../../controllers/dataController.js";
import { register } from "module";
export const resolver = {
    Query: {
        users: getAllUsers,
        user: (_, args) => getUser(args.id),
        getTodos: (_, args) => getTodos(args.id),
        deleteTodo: (_, args) => deleteTodo(args.id),
        currentUser: async (_, __, { req }) => await authUser(req),
    },
    Todo: {
        user: async (todo) => {
            return await getUser(todo.user);
        },
    },
    Mutation: {
        createTodo,
        register,
        logIn,
    },
};
