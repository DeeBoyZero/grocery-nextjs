import Link from "next/link";
import React from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

const MainNavigation = () => {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/efbc71dc9d.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <i aria-hidden className="fas fa-shopping-cart"></i> Grocery App
          </span>
        </div>
        {session && (
          <div className="lg:hidden">
            <i
              onClick={signOut}
              className="fas fa-sign-out-alt fa-2x text-black"
            ></i>
          </div>
        )}
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-black hidden md:visible">
          {!session && <></>}
          {session && (
            <>
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
              <div>
                <span className="font-semibold text-xl tracking-tight mr-4">
                  {session.user.name}{" "}
                </span>
                <button
                  onClick={signOut}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
