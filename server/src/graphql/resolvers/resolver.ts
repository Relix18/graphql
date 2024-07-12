import {
  authUser,
  getAllUsers,
  getUser,
  logIn,
  logOut,
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
    getTodos: (_: any, __: any, { req }: { req: any }) => getTodos(req),
    currentUser: async (_: any, __: any, { req }: { req: any }) =>
      await authUser(req),
  },
  Todo: {
    user: async (todo: any) => {
      return await getUser(todo.user);
    },
  },
  Mutation: {
    createTodo: (_: any, args: any, { req }: { req: any }) =>
      createTodo(args, req),
    register,
    deleteTodo: (_: any, args: any) => deleteTodo(args.id),
    logIn,
    signOut: (_: any, __: any, { res }: { res: any }) => logOut(res),
  },
};
