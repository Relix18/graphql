import React, { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, getUser } from "../graphql/query/query";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type ITodo = {
  _id: string;
  title: string;
  description: string;
};

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { error: userError, data: userData } = useQuery(gql(getUser));
  const {
    loading: todosLoading,
    error: todosError,
    data: todos,
  } = useQuery(gql(getTodos));

  const [add, { data: newTodos }] = useMutation(gql(addTodo), {
    update: (cache, { data: { createTodo } }) => {
      const existingTodos = cache.readQuery({
        query: gql(getTodos),
      });

      cache.writeQuery({
        query: gql(getTodos),
        data: {
          getTodos: [...existingTodos.getTodos, createTodo],
        },
      });
    },
  });

  const [dlt, { data: deleted }] = useMutation(gql(deleteTodo), {
    update: (cache, { data: { deleteTodo } }) => {
      const existingTodos = cache.readQuery({
        query: gql(getTodos),
      });
      const newTodos = existingTodos.getTodos.filter(
        (todo: ITodo) => todo._id !== deleteTodo.id
      );
      console.log(deleteTodo);
      cache.writeQuery({
        query: gql(getTodos),
        data: {
          getTodos: newTodos,
        },
      });
    },
  });

  useEffect(() => {
    if (userError) {
      console.log(userError);
      navigate("/login");
    }
    console.log(userData);
    if (!userData) {
      navigate("/login");
    }
  }, [userError, userData, navigate]);

  useEffect(() => {
    if (todosError) {
      console.log(todosError);
    }
    if (newTodos) {
      console.log(newTodos);
    }
  }, [todosError, newTodos, todos]);

  useEffect(() => {
    if (deleted) {
      console.log(deleted.deleteTodo.message);
    }
  }, [deleted]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add({ variables: { title, description } });
    setTitle("");
    setDescription("");
  };

  const deleteHanlder = (id: string) => {
    console.log(id);
    dlt({ variables: { deleteTodoId: id } });
  };

  const logout = async () => {
    await axios("http://localhost:4000/api/v1/user/logout", {
      withCredentials: true,
    });
    navigate("/login");
  };

  return (
    <section className="mb-6">
      <header className="bg-white shadow mb-2">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-2 md:mx-auto md:flex-row md:items-center">
          <span className="mr-2 text-4xl text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 2.0127V22L15 22C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H9L8.75 2.0127ZM10.75 6.5C10.75 6.08579 11.0858 5.75 11.5 5.75H16.5C16.9142 5.75 17.25 6.08579 17.25 6.5C17.25 6.91421 16.9142 7.25 16.5 7.25H11.5C11.0858 7.25 10.75 6.91421 10.75 6.5ZM10.75 10C10.75 9.58579 11.0858 9.25 11.5 9.25H16.5C16.9142 9.25 17.25 9.58579 17.25 10C17.25 10.4142 16.9142 10.75 16.5 10.75H11.5C11.0858 10.75 10.75 10.4142 10.75 10ZM3.0007 7.25C3.00753 4.91427 3.08136 3.676 3.87868 2.87868C4.55366 2.2037 5.54467 2.04722 7.25 2.01095V21.9891C5.54467 21.9528 4.55366 21.7963 3.87868 21.1213C3.08136 20.324 3.00753 19.0857 3.0007 16.75H4C4.41421 16.75 4.75 16.4142 4.75 16C4.75 15.5858 4.41421 15.25 4 15.25H3V12.75H4C4.41421 12.75 4.75 12.4142 4.75 12C4.75 11.5858 4.41421 11.25 4 11.25H3V8.75H4C4.41421 8.75 4.75 8.41421 4.75 8C4.75 7.58579 4.41421 7.25 4 7.25H3.0007ZM3.0007 7.25H2C1.58579 7.25 1.25 7.58579 1.25 8C1.25 8.41421 1.58579 8.75 2 8.75H3V8C3 7.73811 3 7.48834 3.0007 7.25ZM3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3V12.75ZM3 15.25H2C1.58579 15.25 1.25 15.5858 1.25 16C1.25 16.4142 1.58579 16.75 2 16.75H3.0007C3 16.5117 3 16.2619 3 16V15.25Z"
                fill="#1C2bfa"
              />{" "}
            </svg>
          </span>
          <span className="text-black text-xl font-bold">Todo.</span>

          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute top-5 right-7 cursor-pointer md:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                {userData?.currentUser.name}
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                {userData?.currentUser.email}
              </li>

              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button
                  onClick={logout}
                  className=" border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Heading */}
        <form
          onSubmit={(e) => submitHandler(e)}
          className="my-8 flex w-9/12 flex-col space-y-5  border py-10 px-5 shadow-md bg-white mx-auto"
        >
          <div className="mx-auto mb-2 space-y-3">
            <h1 className=" text-3xl font-bold text-gray-700">Add Todo</h1>
          </div>
          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="title"
                className="border-1 peer block w-full appearance-none border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="title"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Title{" "}
              </label>
            </div>
          </div>
          <div>
            <div className="relative mt-2 w-full">
              <textarea
                id="description"
                className="border-1 h-24 resize-none peer block w-full appearance-none border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="description"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Description
              </label>
            </div>
          </div>
          <button
            type="submit"
            className=" bg-blue-600 py-3 font-bold text-white"
          >
            Add
          </button>
        </form>
        {/* /Heading */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
          {/* Article */}
          {todos?.getTodos.map((todo: ITodo) => (
            <article
              key={todo._id}
              className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md"
            >
              <h1 className="text-md mb-4 uppercase">{todo.title}</h1>
              <h1 className="text-sm font-semibold">{todo.description}</h1>
              <button
                onClick={() => deleteHanlder(todo._id)}
                className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-blue-500 text-white transition-all hover:w-16"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </article>
          ))}
          {/* /Article */}
        </div>
      </div>
    </section>
  );
};

export default Page;
