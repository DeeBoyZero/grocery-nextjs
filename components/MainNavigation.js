import Link from "next/link";

const MainNavigation = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <i className="fas fa-shopping-cart"></i> Grocery App
        </span>
        <span className="lg:hidden"></span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-black hidden md:visible">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Current List
          </Link>
          {/* <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            All Lists
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Add a list
          </a> */}
        </div>
        {/* TODO: AUTHENTICATION */}
        <div>
          <Link
            href="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
