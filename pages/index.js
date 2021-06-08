import { useState, useEffect } from "react";
import Head from "next/head";
import MainNavigation from "../components/MainNavigation";
import SimpleList from "../components/SimpleList";

import { connectToDatabase } from "../utils/mongodb";

import { useRouter } from "next/router";

export default function Home({ isConnected }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <section>
        <MainNavigation />
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Grocery App</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/efbc71dc9d.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <MainNavigation />
      <div className="flex justify-center mt-20">
        <SimpleList items={loadedItems} addItem={addItemHandler} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
