import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Changelog from "../components/Changelog";
import { Box, Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Flex
        pt="15vh"
        minHeight="100vh"
        flexDir="column"
        alignContent="center"
        bgColor="#414141"
      >
        <Changelog />
      </Flex>
    </>
  );
};

export default Home;
