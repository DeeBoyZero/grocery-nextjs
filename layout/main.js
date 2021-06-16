import Head from "next/head";
import MainNavigation from "../components/MainNavigation";

const Main = (props) => {
  return (
    <div>
      <Head>
        <title>Grocery App</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/efbc71dc9d.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <MainNavigation />
      <div>{props.children}</div>
    </div>
  );
};

export default Main;
