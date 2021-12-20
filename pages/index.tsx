import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Changelog from "../components/Changelog";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Changelog />
    </>
  );
};

export default Home;
