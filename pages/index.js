import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Main from "../layout/main";
import Head from "next/head";
import SimpleList from "../components/SimpleList";

import { connectToDatabase } from "../utils/mongodb";

import { useRouter } from "next/router";

export default function Home({ isConnected }) {
  const [loadedItems, setLoadedItems] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();

  const changeFormSubmitState = (bool) => {
    setIsFormSubmitted(bool);
  };

  useEffect(() => {
    fetch("/api/items")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const items = [];

        for (const key in data) {
          const item = {
            id: key,
            ...data[key],
          };
          items.push(item);
        }
        setLoadedItems(items);
        setIsFormSubmitted(false);
      });
  }, [isFormSubmitted]);

  const addItemHandler = (itemData) => {
    fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const editItemHandler = (itemData) => {
    fetch("/api/items", {
      method: "PUT",
      body: JSON.stringify(itemData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (loading) {
    return (
      <Main>
        <p>Loading...</p>
      </Main>
    );
  }

  return (
    <Main>
      {!session && (
        <div>
          <Head>
            <title>Sign In</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex flex-col justify-center mt-10">
            <div>
              <p className="flex justify-center text-lg">
                You are not permitted to see this page.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={signIn}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
      {session && (
        <div className="">
          <Head>
            <title>Grocery App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex justify-center mt-5">
            <SimpleList
              items={loadedItems}
              addItem={addItemHandler}
              editItem={editItemHandler}
              changeFormSubmitState={changeFormSubmitState}
            />
          </div>
        </div>
      )}
    </Main>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
