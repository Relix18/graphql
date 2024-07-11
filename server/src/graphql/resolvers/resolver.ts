import {
  authUser,
  getAllUsers,
  getUser,
  logIn,
} from "../../controllers/userController.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
} from "../../controllers/dataController.js";
import { register } from "module";

export const resolver = {
  Query: {
    users: getAllUsers,
    user: (_: any, args: any) => getUser(args.id),
    getTodos: (_: any, args: any) => getTodos(args.id),
    deleteTodo: (_: any, args: any) => deleteTodo(args.id),
    currentUser: async (_: any, __: any, { req }: { req: any }) =>
      await authUser(req),
  },
  Todo: {
    user: async (todo: any) => {
      return await getUser(todo.user);
    },
  },
  Mutation: {
    createTodo,
    register,
    logIn,
  },
};
