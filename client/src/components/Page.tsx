import React, { useEffect } from "react";
import { getUser } from "../graphql/query/query";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(gql(getUser));

  useEffect(() => {
    if (userError) {
      console.log(userError);
      navigate("/login");
    }
    if (!userData) {
      navigate("/login");
    }
  }, [userError, userData, navigate]);

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
                <button className=" border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Heading */}
        <div className="my-8 flex w-9/12 flex-col space-y-5  border py-10 px-5 shadow-md bg-white mx-auto">
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
          <button className=" bg-blue-600 py-3 font-bold text-white">
            Add
          </button>
        </div>
        {/* /Heading */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
          {/* Article */}
          <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
            <h1 className="text-sm uppercase">nodejs</h1>
            <h1 className="text-lg font-semibold">
              How Good is PNPM when compared to Yarn and Turbo
            </h1>
            <a
              href="#"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </article>
          {/* /Article */}
          {/* Article */}
          <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
            <h1 className="text-sm uppercase">Deno</h1>
            <h1 className="text-lg font-semibold">Is Deno really the Future</h1>
            <a
              href="#"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </article>
          {/* /Article */}
          {/* Article */}
          <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
            <h1 className="text-sm uppercase">Framworks</h1>
            <h1 className="text-lg font-semibold">
              Svelte's actual Value Proposition
            </h1>
            <a
              href="#"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </article>
          {/* /Article */}
          {/* Article */}
          <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
            <h1 className="text-sm uppercase">css</h1>
            <h1 className="text-lg font-semibold">
              Integrating Tailwind into your Devflow
            </h1>
            <a
              href="#"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </article>
          {/* /Article */}
        </div>
      </div>
    </section>
  );
};

export default Page;
