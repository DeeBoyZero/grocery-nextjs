import { useRef } from "react";
import MainNavigation from "../components/MainNavigation";
import { useRouter } from "next/router";

const Login = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      enteredUsername === process.env.NEXT_PUBLIC_USERNAME &&
      enteredPassword === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      router.push("/");
    }
  };

  return (
    <div>
      <MainNavigation />
      <div className="w-full flex justify-center mt-20">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              ref={usernameInputRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              ref={passwordInputRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
