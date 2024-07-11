import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getUser, loginUser, signupUser } from "../../graphql/query/query"; // Assume you have a signupUser query
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [login, { data: loginData, error: loginError }] = useMutation(
    gql(loginUser)
  );
  const [signup, { data: signupData, error: signupError }] = useMutation(
    gql(signupUser)
  );

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(gql(getUser));

  useEffect(() => {
    if (loginError) {
      console.log(loginError.message);
    }
    if (loginData) {
      console.log(loginData);
    }
  }, [loginError, loginData]);

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
    console.log(userData);
    if (userError) {
      console.log(userError);
    }
    if (userLoading) {
      console.log(userLoading);
    }
  }, [userData]);

  useEffect(() => {
    if (signupError) {
      console.log(signupError);
    }
    if (signupData) {
      console.log(signupData);
    }
  }, [signupError, signupData]);

  const changeAuthType = () => {
    setAuth(auth === "login" ? "signup" : "login");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    signup({ variables: { name, email, password } });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width={40}
                height={40}
                patternTransform="scale(0.6) rotate(0)"
              >
                <rect x={0} y={0} width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth={1}
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#a)"
            />
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width={40}
                height={40}
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x={0} y={0} width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth={1}
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>
        {auth === "login" ? (
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              {/* Logo */}
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <span className="flex-shrink-0 text-indigo-500 text-3xl font-black tracking-tight opacity-100">
                  Todo.
                </span>
              </div>

              <form id="" className="mb-4" onSubmit={(e) => handleLogin(e)}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email-username"
                    placeholder="Enter your email"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="············"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                New here?
                <button
                  onClick={changeAuthType}
                  className="pl-2 cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                >
                  {" "}
                  Create an account{" "}
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              {/* Logo */}
              <div className="mb-4 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <span className="flex-shrink-0 text-indigo-500 text-3xl font-black tracking-tight opacity-100">
                  Todo.
                </span>
              </div>

              <form id="" className="mb-4" onSubmit={(e) => handleSignup(e)}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email-username"
                    placeholder="Enter your email"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    id="name"
                    name="username"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="············"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="confirm-password"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="confirm-password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="············"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <p className="-mb-2 text-center">
                Already registered?
                <button
                  onClick={changeAuthType}
                  className="pl-2 cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                >
                  {" "}
                  Login to your account{" "}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
