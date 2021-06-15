import Head from "next/head";
import MainNavigation from "../components/MainNavigation";

const Main = (props) => {
  return (
    <div>
      <MainNavigation />
      <div>{props.children}</div>
    </div>
  );
};

export default Main;
