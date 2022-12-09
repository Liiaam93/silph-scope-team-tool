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
          mt={["5vh", "0vh"]}
          border="solid black 2px"
          borderRadius="5px"
          bg="lightcyan"
          p="10px"
          minH="40vh"
          w="90vh"
        >
          <Heading alignSelf="center" fontSize="2xl">
            <Center> Updates: </Center>
          </Heading>
          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            15.09.2022
          </Heading>
          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>
                Fixed Ultra League roster not showing, and fixed lycanroc formes
              </ListItem>
            </UnorderedList>
          </Box>{" "}
          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            05.09.2022
          </Heading>
          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>
                Added new leagues (Celestial, Timeless, Primeval and Sorcerous)
                and new factions (the ones in iron cycle anyways, will look into
                added all teams eventually and filtering by team ranking, iron,
                open, etc...)
              </ListItem>
            </UnorderedList>
          </Box>
          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            17.02.2022
          </Heading>
          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>
                Fixed move data for Fusion & Cave (Was previously showing
                Great-League moveset, oops...)
              </ListItem>
              <ListItem>
                Shadow Pokemon are now 100% more shadowy (PVPOKE
                Teambuilder-Custom Threats however still doesn't work with
                shadow pokemon... )
              </ListItem>
            </UnorderedList>
          </Box>
          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            11.01.2022
          </Heading>
          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>
                League filter will now also apply to 'Full Player Roster' and
                it's export string.
              </ListItem>{" "}
              <ListItem fontStyle="italic">
                Will add new field specialist leagues soon...
              </ListItem>
            </UnorderedList>
          </Box>
          <Heading fontSize="l" color="slategrey" fontStyle="italic">
            24.12.2021
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
              <ListItem>Started to clean up faction page</ListItem>
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

      {/* -------------------- */}
      <Center>
        <Box
          border="solid black 2px"
          borderRadius="5px"
          bg="pink"
          p="10px"
          w="90vh"
        >
          <Heading alignSelf="center" fontSize="2xl">
            <Center> Known Bugs: </Center>
          </Heading>

          <Box
            mt="3px"
            bg="yellow.100"
            p="4"
            border="solid white 3px"
            borderRadius="5px"
          >
            <UnorderedList pt="2px">
              <ListItem>
                League filters dont properly reset when switching to another
                trainer page (manual fix by toggling to a league and then back
                to 'All Leagues')
              </ListItem>
              <ListItem>
                If page errors on loading a trainer, try refreshing (if it cant
                access silph within 10 seconds it will timeout)
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Center>
    </>
  );
};
export default Changelog;
