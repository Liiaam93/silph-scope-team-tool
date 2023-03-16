import React from "react";
import { FunctionComponent, useState } from "react";
import { Box, HStack, VStack, Center, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { PokemonArray } from "../types";
import { leagueFilterState } from "../atoms";
import { useRecoilState } from "recoil";

const copyPVP = async (copyText: string) => {
  await navigator.clipboard.writeText(copyText);
  alert("copied!");
};

let bgi = "/";

const Roster: FunctionComponent<PokemonArray[]> = ({ ...roster }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [leagueFilter, setLeagueFilter] = useRecoilState(leagueFilterState);

  let counter = 0;

  const copyArray = Object.keys(roster).map((mon, i) =>
    roster[i].tLeague.includes(leagueFilter) || !leagueFilter
      ? roster[i].name +
        "," +
        roster[i].moves[0] +
        "," +
        roster[i].moves[1] +
        "," +
        roster[i].moves[2] +
        "\n"
      : ""
  );

  return (
    <>
      <Flex border="solid white 2px" borderRadius="10" m="auto" paddingX="2">
        {Object.keys(roster).map((keyName, i) => {
          if (
            counter < 3 &&
            (roster[i].tLeague.includes(leagueFilter) || !leagueFilter)
          ) {
            counter++;
            return (
              <Image
                alt={roster[i].name}
                key={keyName}
                src={roster[i].sprite}
                w="70px"
                h="70px"
              />
            );
          }
          return null;
        })}

        <Button bg="gold" m="auto" color="black" onClick={onOpen}>
          Roster
        </Button>
      </Flex>
      <Modal size={"5xl" || "md"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay w="100vw" />
        <ModalContent bg="white">
          <ModalHeader textAlign="center">Roster</ModalHeader>
          <ModalCloseButton />
          <Button
            background="grey"
            _hover={{
              background: "gold",
              color: "black",
            }}
            m="auto"
            w="fit-content"
            onClick={() => copyPVP(copyArray.join(""))}
            mb="3"
          >
            Copy Full Roster
          </Button>
          <ModalBody>
            <Flex wrap="wrap" dir="row" m="auto">
              {Object.keys(roster).map(
                (keyName, i) =>
                  (roster[i].tLeague.includes(leagueFilter) ||
                    !leagueFilter) && (
                    <VStack key={i} maxW="25%" m="auto">
                      {roster[i].isShadow ? (
                        <Image
                          backgroundImage={"/shadowbackdrop.png"}
                          src={roster[i].sprite}
                          alt={roster[i].name}
                        />
                      ) : (
                        <Image
                          backgroundImage={"/"}
                          src={roster[i].sprite}
                          alt={roster[i].name}
                        />
                      )}

                      <Text fontSize="xs">{roster[i].name}</Text>
                      <Text>{roster[i].count}</Text>
                    </VStack>
                  )
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Roster;
