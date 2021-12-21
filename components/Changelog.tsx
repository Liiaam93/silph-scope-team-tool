import { Flex, Text, Box, Center, Heading } from "@chakra-ui/layout";
import { Tournament, Pokemon } from "../types";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import PokemonContainer from "./PokemonContainer";
import { Image, useClipboard } from "@chakra-ui/react";
import { atom, useRecoilState } from "recoil";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { NextPage } from "next";

const Changelog: NextPage = () => {
  return (
    <>
      <Center>
        <Box
          mt={["30vh", "20vh"]}
          border="solid black 2px"
          borderRadius="5px"
          bg="lightcyan"
          p="10px"
          minH="40vh"
        >
          <Heading alignSelf="center" fontSize="2xl">
            <Center> News: </Center>
          </Heading>

          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            21.12.2021
          </Heading>
          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>Added option to copy / export entire roster</ListItem>
              <ListItem fontStyle="italic">
                (Currently no way to filter roster, WIP)
              </ListItem>
            </UnorderedList>
          </Box>

          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            20.12.2021
          </Heading>
          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>Added option to filter by League</ListItem>
              <ListItem>
                Moves &amp; PVPoke export now appear automatically
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Center>
    </>
  );
};
export default Changelog;
