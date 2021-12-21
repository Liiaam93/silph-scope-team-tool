import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Changelog from "../components/Changelog";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Changelog />
    </>
  );
};

export default Home;
