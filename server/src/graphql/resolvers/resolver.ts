import {
  getAllUsers,
  getUser,
  logIn,
  register,
} from "../../controllers/userController.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
} from "../../controllers/dataController.js";

export const resolver = {
  Query: {
    users: getAllUsers,
    user: (_: any, args: any) => getUser(args.id),
    getTodos: (_: any, args: any) => getTodos(args.id),
    deleteTodo: (_: any, args: any) => deleteTodo(args.id),
  },
  Todo: {
    user: async (todo: any) => {
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
